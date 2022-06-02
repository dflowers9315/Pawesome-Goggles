const express = require("express");
const mongoose = require('mongoose');
const Product = require("./models/product");
const app = express();

// connect to database
mongoose.connect('mongodb://localhost/pawesome-goggles');

var db = mongoose.connection
db.once('open', ()=> {
    console.log('connected to db')
})



app.set("view engine","hbs");



app.get("/", function(req, res){
    // render index page
    res.render('index.hbs')
})

//show all products
app.get("/products", function(req, res){
    Product.find({}, function(products) {
        console.log(products)
        res.render("products.hbs", {
            products: products
        })

    })
    console.log("products")
    
})

app.get("/products/new", function(req,res){
    console.log("newproducts")
res.render("new-product.hbs")
})


app.listen(3000, function(){
        console.log("server started on port 3000")
})