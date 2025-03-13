import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/users/register",
        formData
      );
      setMessage(response.data.msg);
      setFormData({ username: "", email: "", password: "" , role:""}); // Réinitialisation des champs
    } catch (error) {
      setMessage(error.response?.data?.msg || "Une erreur est survenue");
    }
  };

  return (
    <Box
sx={{
maxWidth: 400,
mx: "auto",
mt: 5,
p: 3,
boxShadow: 3,
borderRadius: 2,
backgroundColor: "white",
}}
>
<Typography variant="h5" mb={2} textAlign="center">
Inscription
</Typography>
<form onSubmit={handleSubmit}>
<TextField
fullWidth
label="Nom d'utilisateur"
name="username"
value={formData.username}
onChange={handleChange}
margin="normal"
required
/>
<TextField
fullWidth
type="email"
label="Email"
name="email"
value={formData.email}
onChange={handleChange}
margin="normal"
required
/>
<TextField
fullWidth
type="password"
label="Mot de passe"
name="password"
value={formData.password}
onChange={handleChange}
margin="normal"
required
/>
<FormControl fullWidth margin="normal" required>
<InputLabel>Rôle</InputLabel>
<Select name="role" value={formData.role} onChange={handleChange}>
<MenuItem value="user">User</MenuItem>
<MenuItem value="admin">Admin</MenuItem>
</Select>
</FormControl>
<Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
S'inscrire
</Button>
</form>
<Typography mt={2}>
Déjà avoir un compte ?{" "}
<Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
Connectez-vous ici
</Link>
</Typography>
{message && (
<Typography color="error" textAlign="center" mt={2}>
{message}
</Typography>
)}
</Box>
);
};
export default Register;

