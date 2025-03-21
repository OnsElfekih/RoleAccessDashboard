const router = require("express").Router();
const Product = require("../../models/Product");

router.post("/add", async (req, res) => {
    const { name, quantite, dateFabrication } = req.body;

    if (!name || !quantite || !dateFabrication) {
        return res.status(400).json({ status: "error", msg: "Veuillez fournir toutes les données requises" });
    }

    try {
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ status: "error", msg: "Le produit existe déjà" });
        }

        const newProduct = new Product({ name, quantite, dateFabrication });
        const savedProduct = await newProduct.save();

        res.status(201).json({ status: "success", msg: "Produit ajouté avec succès", product: savedProduct });
    } catch (err) {
        res.status(500).json({ status: "error", msg: "Erreur interne du serveur" });
    }
});

router.get("/all", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Erreur lors de la récupération des produits" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: "error", msg: "Produit non trouvé" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Erreur lors de la récupération du produit" });
    }
});


router.put("/:id", async (req, res) => {
    const { name, quantite, dateFabrication } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, quantite, dateFabrication }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ status: "error", msg: "Produit non trouvé" });
        }
        res.status(200).json({ status: "success", msg: "Produit mis à jour", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Erreur lors de la mise à jour du produit" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ status: "error", msg: "Produit non trouvé" });
        }
        res.status(200).json({ status: "success", msg: "Produit supprimé" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Erreur lors de la suppression du produit" });
    }
});

module.exports = router;
