// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

function CoffeeMachine(water, milk, coffeeBeans, disposableCups, income) {
    this.water = water;
    this.milk = milk;
    this.coffeeBeans = coffeeBeans;
    this.disposableCups = disposableCups;
    this.income = income;

    this.displayState = function () {
        console.log(`
The coffee machine has:
${this.water} ml of water
${this.milk} ml of milk
${this.coffeeBeans} g of coffee beans
${this.disposableCups} disposable cups
$${this.income} of money
`)
    }

    this.makeCoffee = function (type) {
        const ESPRESSO_WATER_PORTION = 250;
        const ESPRESSO_COFFEE_BEANS_PORTION = 16;
        const ESPRESSO_PRICE = 4;
        const CAPPUCCINO_WATER_PORTION = 200;
        const CAPPUCCINO_MILK_PORTION = 100;
        const CAPPUCCINO_COFFEE_BEANS_PORTION = 12;
        const CAPPUCCINO_PRICE = 6;
        const LATTE_WATER_PORTION = 350;
        const LATTE_MILK_PORTION = 75;
        const LATTE_COFFEE_BEANS_PORTION = 20;
        const LATTE_PRICE = 7;
        const DISPOSABLE_CUP_PORTION = 1;

        switch (type) {
            case "1": //espresso
                if (this.isEnoughResources(ESPRESSO_WATER_PORTION, 0, ESPRESSO_COFFEE_BEANS_PORTION)) {
                    this.water -= ESPRESSO_WATER_PORTION;
                    this.coffeeBeans -= ESPRESSO_COFFEE_BEANS_PORTION;
                    this.disposableCups -= DISPOSABLE_CUP_PORTION;
                    this.income += ESPRESSO_PRICE;
                }
                break;
            case "2": //latte
                if (this.isEnoughResources(LATTE_WATER_PORTION, LATTE_MILK_PORTION, LATTE_COFFEE_BEANS_PORTION)) {
                    this.water -= LATTE_WATER_PORTION;
                    this.milk -= LATTE_MILK_PORTION;
                    this.coffeeBeans -= LATTE_COFFEE_BEANS_PORTION;
                    this.disposableCups -= DISPOSABLE_CUP_PORTION;
                    this.income += LATTE_PRICE;
                }
                break;
            case "3": //cappuccino
                if (this.isEnoughResources(CAPPUCCINO_WATER_PORTION, CAPPUCCINO_MILK_PORTION, CAPPUCCINO_COFFEE_BEANS_PORTION)) {
                    this.water -= CAPPUCCINO_WATER_PORTION;
                    this.milk -= CAPPUCCINO_MILK_PORTION;
                    this.coffeeBeans -= CAPPUCCINO_COFFEE_BEANS_PORTION;
                    this.disposableCups -= DISPOSABLE_CUP_PORTION;
                    this.income += CAPPUCCINO_PRICE;
                }
                break;
        }
    }

    this.fillMachine = function (water, milk, coffeeBeans, disposableCups) {
        this.water += water;
        this.milk += milk;
        this.coffeeBeans += coffeeBeans;
        this.disposableCups += disposableCups;
    };

    this.take = function () {
        console.log();
        console.log(`I gave you $${this.income}`);
        this.income = 0;
    }

    this.isEnoughResources = function (water, milk, coffeeBeans) {
        if (this.water >= water) {
            if (this.milk >= milk) {
                if (this.coffeeBeans >= coffeeBeans) {
                    if (this.disposableCups >= 1) {
                        console.log("I have enough resources, making you a coffee!");
                        return true;
                    } else {
                        console.log("Sorry, not enough disposable cups!");
                        return false;
                    }
                } else {
                    console.log("Sorry, not coffee beans!");
                    return false;
                }
            } else {
                console.log("Sorry, not enough milk!")
                return false;
            }
        } else {
            console.log("Sorry, not enough water!");
            return false;
        }
    }
}

run();

function run() {
    let coffeeMachine = new CoffeeMachine(400, 540, 120, 9, 550);
    let exit = false;

    while (!exit) {
        let choice = input("Write action (buy, fill, take, remaining, exit): ");

        switch (choice) {
            case "buy":
                buy(coffeeMachine);
                break;
            case "fill":
                fill(coffeeMachine);
                break;
            case "take":
                coffeeMachine.take();
                break;
            case "remaining":
                coffeeMachine.displayState();
                break;
            case "exit":
                exit = true;
                break;
        }
    }
}

function buy(coffeeMachine) {
    let choice = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ");

    switch (choice) {
        case "1":
        case "2":
        case "3":
            coffeeMachine.makeCoffee(choice);
            break;
        case "back":
            break;
    }
}

function fill(coffeeMachine) {
    let water = Number(input("Write how many ml of water the coffee machine has:"));
    let milk = Number(input("Write how many ml of milk the coffee machine has:"));
    let coffeeBeans = Number(input("Write how many grams of coffee beans the coffee machine has:"));
    let disposableCups = Number(input("Write how many disposable cups you want to add:"));

    coffeeMachine.fillMachine(water, milk, coffeeBeans, disposableCups);
}
