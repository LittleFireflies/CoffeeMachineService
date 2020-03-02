const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

var stock = {
    "coffee": 250,
    "water": 1000,
    "milk": 500,
    "cups": 10,
    "moneyBalance": 50
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
    var price = 0;

    switch (id) {

        case "1":
            coffeeNeeded = menu.espresso.coffeeNeeded;
            waterNeeded = menu.espresso.waterNeeded;
            milkNeeded = menu.espresso.milkNeeded;
            price = menu.espresso.price;
            break;
        case "2":
            coffeeNeeded = menu.latte.coffeeNeeded;
            waterNeeded = menu.latte.waterNeeded;
            milkNeeded = menu.latte.milkNeeded;
            price = menu.latte.price;
            break;
        case "3":
            coffeeNeeded = menu.cappuccino.coffeeNeeded;
            waterNeeded = menu.cappuccino.waterNeeded;
            milkNeeded = menu.cappuccino.milkNeeded;
            price = menu.cappuccino.price;
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
        stock.moneyBalance += price;

        res.send("I have enough resources, making you a coffee!");
    }
});

app.post("/fillstock", (req, res) => {
   const coffee = parseInt(req.body.coffee || '0');
   const water = parseInt(req.body.water || '0');
   const milk = parseInt(req.body.milk || '0');
   const cups = parseInt(req.body.cups || '0');

   stock.coffee += coffee;
   stock.water += water;
   stock.milk += milk;
   stock.cups += cups;

   res.send('Stocks added successfully');
});

app.get("/takemoney", (req, res) => {
   const money = stock.moneyBalance;
   stock.moneyBalance = 0;
   res.send(`I gave you $${money}`);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is up and listening on " + PORT)
});