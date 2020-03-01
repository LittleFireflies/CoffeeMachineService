const express = require('express');
const app = express();

var stock = {
    "coffee": 250,
    "water": 1000,
    "milk": 500,
    "cups": 10
};

var menu = {
    "espresso": {
        "id": 1,
        "name": "espresso",
        "coffeeNeeded": 16,
        "waterNeeded": 250,
        "milkNeeded": 0,
        "price": 4
    },
    "latte": {
        "id": 2,
        "name": "latte",
        "coffeeNeeded": 20,
        "waterNeeded": 350,
        "milkNeeded": 7,
        "price": 7
    },
    "cappuccino": {
        "id": 3,
        "name": "cappuccino",
        "coffeeNeeded": 12,
        "waterNeeded": 200,
        "milkNeeded": 100,
        "price": 6
    }
};

app.get("/", (req, res) => {
    res.send("Hello, World!")
});

app.get("/stocks", (req, res) => {
    res.send(stock)
});

app.get("/menus", (req, res) => {
    res.send(menu)
});

app.get("/order/:id", (req, res) => {
    const id = req.params.id;

    var coffeeNeeded = 0;
    var waterNeeded = 0;
    var milkNeeded = 0;

    switch (id) {

        case "1":
            coffeeNeeded = menu.espresso.coffeeNeeded;
            waterNeeded = menu.espresso.waterNeeded;
            milkNeeded = menu.espresso.milkNeeded;
            break;
        case "2":
            coffeeNeeded = menu.latte.coffeeNeeded;
            waterNeeded = menu.latte.waterNeeded;
            milkNeeded = menu.latte.milkNeeded;
            break;
        case "3":
            coffeeNeeded = menu.cappuccino.coffeeNeeded;
            waterNeeded = menu.cappuccino.waterNeeded;
            milkNeeded = menu.cappuccino.milkNeeded;
            break;
        default:
            res.status(500).send('Error: Menu not found!');
            break;
    }

    if (stock.cups === 0)
        res.send('Sorry, not enough cups');
    else if (stock.coffee < coffeeNeeded)
        res.send('Sorry, not enough coffee beans');
    else if (stock.water < waterNeeded)
        res.send('Sorry, not enough water');
    else if (stock.milk < milkNeeded)
        res.send('Sorry, not enough milk');
    else {
        stock.coffee -= coffeeNeeded;
        stock.water -= waterNeeded;
        stock.milk -= milkNeeded;
        stock.cups--;

        res.send("I have enough resources, making you a coffee!");
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is up and listening on " + PORT)
});