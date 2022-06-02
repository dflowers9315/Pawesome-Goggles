const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({ 
    name: 'string', 
    description: 'string',
    price: 'string'
});




const Product = mongoose.model('Product', productSchema);
module.exports = Product