const express = require("express");
const mongoose = require('mongoose');
const Product = require("./models/product");
const bodyParser = require("body-parser");
const app = express();

// connect to database
mongoose.connect('mongodb://localhost/pawesome-goggles');

var db = mongoose.connection
db.once('open', ()=> {
    console.log('connected to db')
})



app.set("view engine","hbs");

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function(req, res){
    // render index page
    res.render('index.hbs')
})

//show all products
app.get("/products", function(req, res){
    Product.find({}, function(err, product) {
        console.log(product)
        res.render("products.hbs", {
            products: product
        })

    })
    console.log("products")
    
})
//add new products
app.get("/products/new", function(req,res){
    console.log("newproducts")
res.render("new-product.hbs")
})

app.post("/products/new", function(req,res){
    console.log(req.body)
    let newProduct = new Product()
    newProduct.name = req.body.name
    newProduct.price = req.body.price
    newProduct.description = req.body.description
    newProduct.image = req.body.image
    newProduct.save(); 

    res.redirect('/products/new')
})

app.get('/products/:id/edit',(req, res)=> {
    console.log(req.params.id)
    Product.findById(req.params.id,(err, product)=> {
        if(err) {
            console.log(err)
        }
        console.log(product)
        res.render('edit-product.hbs', {
            product: product
        })
    })
})

app.post('/products/:id/edit', (req, res) => {

    Product.findOneAndUpdate({id: req.params.id},{name: req.body.name, price: req.body.price, description: req.body.description, image: req.body.image}, function(err, product) {
        if(err) {
            console.log(err)
            res.send(err)
        }
        res.render('edit-product.hbs', {
            product: product
        })
    })
})

app.post('/products/:id/delete',(req, res) => {
    Product.findOneAndRemove({_id: req.params.id }, function(err, product){
        console.log(req.params.id + ' has been deleted from DB')
        res.redirect('/products')
    })
})

app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, product)=> {
        res.render('product-show.hbs', {
            product: product
        })
    })
})

//starts server
app.listen(3000, function(){
        console.log("server started on port 3000")
})