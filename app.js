const path = require("path");
// initialize the express obj
var express=require('express');
var app=express();
var cors = require('cors');
// allows the json parsing.
app.use(express.json());
//uses me while runing my client code on another port
app.use(cors());
app.use(express.static(path.join(__dirname,'angular','dist','itemsPro')));

// ALLOW CORS ORIGIN for dev purposes
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
}

//defining the Item obj.
class Item {
    static #uuid = 1;
    constructor(name , description, count) {
      this.id = Item.#uuid++;
      this.name = name;
      this.description = description;
      this.count = count;
    }
  }

//initilize a constant array of 3 Items (obj).
  const i1 = new Item("book","Harry Potter", 20);
  const i2 = new Item("cup","Blue cup", 100);
  const i3 = new Item("computer", "HP laptop", 45);
  const items = [i1, i2, i3];



  // Rest API starts here

  // get all items
  app.get('/items/all',cors(corsOptions),(req,res)=>{
    res.send(items);
  });

  // get item by id
  app.get('/items/:id',cors(corsOptions),(req,res)=>{
      let item = items.find(item => item.id === parseInt(req.params.id)); //getting the specific item from the array 
      if (!item) return res.status(404).send("Item not found!"); // sending error message if the item not found
       res.send(item); // sending the required item if does found
  });


  // add item to inventory
  app.post('/items/add', cors(corsOptions), (req, res)=>{
    let item = new Item(req.body.name, req.body.description, req.body.count); // defining the new item
    if (parseInt(req.body.count) < 0 ) return res.status(400).send("Count must be a positive number"); 
    if (!(Number.isInteger(req.body.count))) return res.status(400).send("Count must be an Integer");
    items.push(item); // adding item to the array
    res.send(item); //sending back to the client the new item
});

// update item
 app.put('/items/update/:id', cors(corsOptions), (req, res)=>{
    let item = items.find(item => item.id === parseInt(req.params.id)); //getting the specific item we need to update from the array
    if (!item) res.status(404).send("Item not found!"); // sending error message if the item not found
    if (parseInt(req.body.count) < 0 ) return res.status(400).send("Count must be a positive number"); 
    if (!(Number.isInteger(req.body.count))) return res.status(400).send("Count must be an Integer");
    item.name = req.body.name; //setting the name according to client wish
    item.description = req.body.description; //setting the description according to client wish
    item.count = req.body.count; //setting the count according to client wish
    res.send(item); //sending back to the client the updated item
});

// remove item by id
 app.delete('/items/delete/:id', cors(corsOptions), (req, res)=>{
    let item = items.find(item => item.id === parseInt(req.params.id)); //getting the specific item we need to delete from the array
    if (!item) return res.status(404).send("Item not found!"); // sending error message if the item not found
    let index = items.indexOf(item); //tracking the index of this specific item
    items.splice(index, 1); // deleting this item from the array
    res.send("Item " + req.params.id + " deleted."); // sending notification to the client about the process
});

// withdraw item 
 app.put('/items/withdraw/:id/:amount', cors(corsOptions),(req,res)=>{
   let amount = parseInt(req.params.amount);
   console.log("amount=" + amount);
    let item = items.find(item => item.id === parseInt(req.params.id)); //getting the specific item we need to update his count from the array
    if (!item) return res.status(404).send("Item not found!"); // sending error message if the item not found
    if ((item.count - amount) < 0) return res.status(400).send("Invenory cannot provide this amount at the moment"); //checking if the requested amount is availble according to  item inventory.
    if (amount < 0) return res.status(400).send("The amount must be a positive number.");
    // if ((Number.isInteger(amount))== false) return res.status(400).send("The amount must be an integer.");
    item.count -= parseInt(amount); // updating the count for this item
    res.send(item); // sending back to the client the updated item
});

// deposite item
 app.put('/items/deposit/:id/:amount', cors(corsOptions),(req,res)=>{
    let amount = parseInt(req.params.amount);
    let item = items.find(item => item.id === parseInt(req.params.id)); //getting the specific item we need to update his count from the array
    if (!item) return res.status(404).send("Item not found!"); // sending error message if the item not found
    if (amount < 0) return res.status(400).send("The amount must be a positive number.");
    // if (!(Number.isInteger(req.params.amount))) return res.status(400).send("The amount must be an integer.");
    item.count += parseInt(req.params.amount); // updating the count for this item
    res.send(item); // sending back to the client the updated item
});

var port = 3000;
var server=app.listen(port,function() {
  console.log("Server is listening on port " + port);
});