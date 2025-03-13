import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useNavigate
import { Button } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate(); // Déclaration de useNavigate

  useEffect(() => {
    localStorage.removeItem('authToken'); 
    console.log("Utilisateur déconnecté");
    navigate('/');
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
