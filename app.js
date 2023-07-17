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

  

app.get("/",function(req, res){
    
    

    Item.find({}).then(function(foundItems){
      if(foundItems.length === 0 ){
        Item.insertMany(defaultItems)
          .then(function(){
            console.log("Successfully saved into our DB.");
          })
          .catch(function(err){
            console.log(err);
          });
          res.redirect("/")
      }else{
        res.render("list", { listTitle: "Today", newListItems: foundItems });
      }
      
    })
    .catch(function(err){
      console.log(err);
    });

});

app.post("/",function(req, res){

   const itemName = req.body.newItem;

   const item = new Item({
    name: itemName
   })
   item.save()

   res.redirect("/")
    
});

app.post("/delete",function(req, res){
  const checkedItemId = req.body.checkbox
  if (checkedItemId != undefined){
    Item.findByIdAndRemove(checkedItemId)
    .then(()=> console.log(`Deleted ${checkedItemId} succesfully`))
    .catch((err) => console.log("Deletion Error " + err));
    res.redirect("/")
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