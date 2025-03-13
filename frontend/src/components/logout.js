import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useNavigate
import { Button } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate(); // Déclaration de useNavigate

  useEffect(() => {
    // Suppression du token d'authentification ou autres informations nécessaires
    localStorage.removeItem('authToken'); // Remplacer 'authToken' par le nom de la clé utilisée
    console.log("Utilisateur déconnecté");

    // Redirection vers la page de connexion
    navigate('/'); // Redirige l'utilisateur vers '/login'
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Vous êtes maintenant déconnecté</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
      >
        Revenir à la page de connexion
      </Button>
    </div>
  );
};

export default Logout;
