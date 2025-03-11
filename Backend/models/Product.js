const mongoose = require('mongoose');
// Définir le schéma utilisateur
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
// Créer un modèle basé sur ce schéma
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;