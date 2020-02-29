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

    switch (id) {
        case "1":
            stock.coffee -= menu.espresso.coffeeNeeded;
            stock.water -= menu.espresso.waterNeeded;
            stock.milk -= menu.espresso.milkNeeded;
            stock.cups--;

            res.send(menu.espresso);
            break;
        case "2":
            stock.coffee -= menu.latte.coffeeNeeded;
            stock.water -= menu.latte.waterNeeded;
            stock.milk -= menu.latte.milkNeeded;
            stock.cups--;

            res.send(menu.latte);
            break;
        case "3":
            stock.coffee -= menu.cappuccino.coffeeNeeded;
            stock.water -= menu.cappuccino.waterNeeded;
            stock.milk -= menu.cappuccino.milkNeeded;
            stock.cups--;

            res.send(menu.cappuccino);
            break;
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is up and listening on " + PORT)
});