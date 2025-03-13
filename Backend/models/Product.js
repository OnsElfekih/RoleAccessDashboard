const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
name: {
type: String,
required: true,
unique:true
},
quantite: {
type: Number,
required: true,
},
dateFabrication: {
type: Date,
required: true, 
},
});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;