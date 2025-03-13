import React, { useEffect, useState } from "react";
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
  Button,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3001/users/all")
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        setLoading(false);
      });
  };

  const handleAdd = () => {
    axios.post("http://localhost:3001/users/register", newUser)
      .then(() => {
        fetchUsers();
        setOpenAdd(false);
        setMessage("Utilisateur ajouté avec succès");
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout :", error);
        setMessage("Erreur lors de l'ajout de l'utilisateur");
      });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser(user);
    setOpenEdit(true);
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/users/${selectedUser._id}`, newUser)
      .then(() => {
        fetchUsers();
        setOpenEdit(false);
        setMessage("Utilisateur mis à jour avec succès");
      })
      .catch(error => {
        console.error("Erreur lors de la modification :", error);
        setMessage("Erreur lors de la modification de l'utilisateur");
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => fetchUsers())
      .catch(error => console.error("Erreur lors de la suppression :", error));
  };

  return (
    <Box sx={{ display: "flex" }}>
    <Navbar/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {/* AppBar */}
            <AppBar position="static">
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6">Liste des Utilisateurs</Typography>
        </Toolbar>
      </AppBar>
      {message && <Typography color="error" textAlign="center" mt={2}>{message}</Typography>}
      
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
        sx={{ mt: 3,mb:3}} // Marge supérieure pour espacer le bouton de l'AppBar
        >
        Ajouter Utilisateur
      </Button>

      {loading ? (
        <Typography>Chargement...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ width: "90%", maxHeight: "80vh", overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user)} sx={{ mr: 2 }}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog Add User */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Ajouter un Utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <TextField
            select
            label="Role"
            fullWidth
            margin="dense"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">Annuler</Button>
          <Button onClick={handleAdd} color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Edit User */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Modifier Utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            select
            label="Role"
            fullWidth
            margin="dense"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">Annuler</Button>
          <Button onClick={handleUpdate} color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
      </Box>
      </Box>
  );
};

export default UserList;
