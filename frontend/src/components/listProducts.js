import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppBar, Toolbar} from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./navbar";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openModifyDialog, setOpenModifyDialog] = useState(false);
  const [productToModify, setProductToModify] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false); // État pour ouvrir la boîte de dialogue d'ajout
  const [newProduct, setNewProduct] = useState({ name: "", quantite: "", dateFabrication: "" }); // État pour le nouveau produit

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products/all");
        setProducts(response.data);
      } catch (error) {
        setMessage("Erreur lors du chargement des produits");
      }
    };
    fetchProducts();
  }, []);

  const handleModify = (product) => {
    setProductToModify(product);
    setOpenModifyDialog(true);
  };

  const handleSaveModify = async () => {
    try {
      await axios.put(`http://localhost:3001/products/${productToModify._id}`, productToModify);
      setProducts(
        products.map((product) =>
          product._id === productToModify._id ? productToModify : product
        )
      );
      setMessage("Produit mis à jour avec succès");
      setOpenModifyDialog(false);
    } catch (error) {
      setMessage("Erreur lors de la mise à jour du produit");
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await axios.delete(`http://localhost:3001/products/${productToDelete._id}`);
        setProducts(products.filter((product) => product._id !== productToDelete._id));
        setMessage("Produit supprimé avec succès");
      } catch (error) {
        setMessage("Erreur lors de la suppression du produit");
      } finally {
        setOpenDialog(false);
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleModifyDialogClose = () => {
    setOpenModifyDialog(false);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setNewProduct({ name: "", quantite: "", dateFabrication: "" }); // Réinitialiser les champs
};


const handleAddProduct = async () => {
  // Validate the form before submitting
  if (!newProduct.name || !newProduct.quantite || !newProduct.dateFabrication) {
      setMessage("Veuillez fournir toutes les données requises");
      return;
  }

  try {
      const response = await axios.post("http://localhost:3001/products/add", newProduct);
      if (response.status === 201) {
          setProducts([...products, response.data.product]); // Ajouter le nouveau produit à la liste
          setMessage("Produit ajouté avec succès");
          handleAddDialogClose(); // Fermer la boîte de dialogue d'ajout
      }
  } catch (error) {
      setMessage("Erreur lors de l'ajout du produit");
  }
};



  return (
        <Box sx={{ display: "flex" }}>
      <Navbar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* AppBar */}
          <AppBar position="static">
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6">Liste des Produits</Typography>
        </Toolbar>
      </AppBar>
      {message && (
        <Typography color="error" textAlign="center" mt={2}>
          {message}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddDialog(true)} // Ouvre la boîte de dialogue d'ajout
        sx={{ mt: 3,mb:3}}
      >
        Ajouter Produit
      </Button>

      <TableContainer component={Paper} sx={{ width: "90%", maxHeight: "80vh", overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Date de Fabrication</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantite}</TableCell>
                <TableCell>{new Date(product.dateFabrication).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleModify(product)} sx={{ mr: 2 }}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(product)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Boîte de dialogue pour ajouter un produit */}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Ajouter un produit</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantité"
            value={newProduct.quantite}
            onChange={(e) => setNewProduct({ ...newProduct, quantite: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date de fabrication"
            value={newProduct.dateFabrication}
            onChange={(e) => setNewProduct({ ...newProduct, dateFabrication: e.target.value })}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Boîte de dialogue pour confirmer la suppression */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer le produit "{productToDelete ? productToDelete.name : ""}" ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Boîte de dialogue pour modifier un produit */}
      <Dialog open={openModifyDialog} onClose={handleModifyDialogClose}>
        <DialogTitle>Modifier le produit</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            value={productToModify.name || ""}
            onChange={(e) => setProductToModify({ ...productToModify, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantité"
            value={productToModify.quantite || ""}
            onChange={(e) => setProductToModify({ ...productToModify, quantite: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date de fabrication"
            value={productToModify.dateFabrication || ""}
            onChange={(e) => setProductToModify({ ...productToModify, dateFabrication: e.target.value })}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModifyDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveModify} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Box>
  );
};

export default ListProducts;
