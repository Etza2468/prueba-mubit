class Money {
    constructor(value, quantity) {
        this.value = value;
        this.quantity = quantity;
    }
}

let cash = [];
cash.push(new Money(1000, 100));
cash.push(new Money(500, 100));
cash.push(new Money(200, 100));
cash.push(new Money(100, 100));
cash.push(new Money(50, 100));
cash.push(new Money(20, 100));
cash.push(new Money(10, 100));
cash.push(new Money(5, 100));
cash.push(new Money(2, 100));
cash.push(new Money(1, 100));
cash.push(new Money(.50, 100));

let returned = [];
let coins = 0;
let div = 0;

let money = document.getElementById("payInput");
let recive = document.getElementById("reciveInput");
let toPayButton = document.getElementById("toPayButton");
let form = document.getElementById("form-pay");
let result = document.getElementById("result");
let message = document.getElementById("message");
let denominations = document.getElementById("denominations");
let toBackButton = document.getElementById("toBackButton");

toPayButton.addEventListener("click", ProcessingToPay);
toBackButton.addEventListener("click", ToBack);

function ProcessingToPay() {
    let returnMoney = parseFloat(recive.value) - parseFloat(money.value);
    returned = [];
    message.innerHTML = "El cambio a entregar es de: $" + returnMoney;

    for (cashMoney of cash) {
        if (returnMoney > 0) {
            div = Math.floor(returnMoney / cashMoney.value);
            div > cashMoney.quantity ? coins = cashMoney.quantity : coins = div;
            returned.push(new Money(cashMoney.value, coins));

            returnMoney -= (cashMoney.value * coins);
        }
    }
    
    if (returnMoney > 0) {
		denominations.innerHTML = "No puedo procesar tu transacción por falta de dinero";
    } else {
        for (e of returned) {
            if (e.quantity > 0) {
                for (let i = 1; i <= e.quantity; i++) {
                    denominations.innerHTML += ' <img src="img/' + e.value + '.webp" height="70" width="100"/>';
                }
            }
		}
    }
    
    form.style.display = "none";
    result.style.display = "block";
}

function ToBack() {
    money.value = "";
    recive.value = "";
    form.style.display = "block";
    result.style.display = "none";
    denominations.innerHTML = "";
}