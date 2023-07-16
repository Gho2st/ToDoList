const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js")
const mongoose = require("mongoose")
const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});
//Created Schema
const itemsSchema = new mongoose.Schema({
    name: String
  });
   
  //Created model
  const Item = mongoose.model("Item", itemsSchema);
   
  //Creating items
  const item1 = new Item({
    name: "Welcome to your todo list."
  });
   
  const item2 = new Item({
    name: "Hit + button to create a new item."
  });
   
  const item3 = new Item({
    name: "<-- Hit this to delete an item."
  });
   
  //Storing items into an array
  const defaultItems = [item1, item2, item3];

  Item.insertMany(defaultItems)
    .then(function(){
      console.log("Successfully saved into our DB.");
    })
    .catch(function(err){
      console.log(err);
    });

app.get("/",function(req, res){
    
    // const day = date.getDate();

    res.render("list",{listTitle: "Today", newListItems: items});

});

app.post("/",function(req, res){

    let item = req.body.newItem;
    
    if (req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }

    
});

app.get("/work",function(req, res){
    res.render("list",{listTitle: "Work List", newListItems: workItems})
})

app.get("/about",function(req, res){
    res.render("about")
})


app.listen(3000,function(){
    console.log("server started on port 3000")
});