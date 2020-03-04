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
    "data": [
        {
            "id": 1,
            "name": "espresso",
            "description": "An espresso is a small volume of concentrated coffee, extracted under pressure with water at no more than 98 degrees celsius.",
            "image": "images/espresso.jpg",
            "coffeeNeeded": 16,
            "waterNeeded": 250,
            "milkNeeded": 0,
            "price": 4
        },
        {
            "id": 2,
            "name": "latte",
            "description": "A Latte or Cafe con Latte is made the same way as a cappuccino except that it is served in a larger 220 ml glass and only has 10mm of foam.",
            "image": "images/latte.jpg",
            "coffeeNeeded": 20,
            "waterNeeded": 350,
            "milkNeeded": 7,
            "price": 7
        },
        {
            "id": 3,
            "name": "cappuccino",
            "description": "A cappuccino starts with the espresso but this is topped with milk textured (frothed) to no more than 65 degrees celsius.",
            "image": "images/cappuccino.png",
            "coffeeNeeded": 12,
            "waterNeeded": 200,
            "milkNeeded": 100,
            "price": 6
        }
    ]
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
    const id = parseInt(req.params.id || '0');
    var selectedMenu = menu.data.filter(function (item) {
        return item.id === id
    });

    var coffeeNeeded = selectedMenu[0].coffeeNeeded || 0;
    var waterNeeded = selectedMenu[0].waterNeeded || 0;
    var milkNeeded = selectedMenu[0].milkNeeded || 0;
    var price = selectedMenu[0].price || 0;

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