const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({ 
    name: 'string', 
    description: 'string',
    price: 'number',
    image: 'string',
});




const Product = mongoose.model('Products', productSchema);
module.exports = Product