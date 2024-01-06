import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { isAuthenticated } from '../../utils/helpers';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Logique de déconnexion : Supprimer le token du local storage
    localStorage.removeItem('token');
    // Mettre à jour l'état pour déclencher le rechargement du composant
    setIsLoggedIn(false);
    // Ajouter toute autre logique de déconnexion nécessaire
  };

  useEffect(() => {
    if (isAuthenticated()) {
      // Si l'utilisateur est connecté, mettre à jour l'état pour déclencher le rechargement du composant
      setIsLoggedIn(true);
    }
  }, []); // Effectue la vérification une fois lors du montage initial du composant

  useEffect(() => {
    if (isLoggedIn) {
      // Une fois que l'utilisateur est connecté, réinitialiser l'état pour éviter un rechargement continu
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]); // Effectue l'action une fois que l'état de connexion a changé

  return (
    <nav>
      <div className='left'>
        <div className='logo'>
          <img id='img-logo' src='/images/logo.png' alt="Logo" />
          <p>RAUDI</p>
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/accounting">Comptabilité</Link></li>
        </ul>
      </div>
      <div className='action'>
        {!isAuthenticated() && (
          <>
            <Link to="/register">
              <button id='register'>Register</button>
            </Link>
            <Link to="/login">
              <button id='login'>Login</button>
            </Link>
          </>
        )}
        {isAuthenticated() && (
          <button id='logout' onClick={handleLogout}>Déconnexion</button>
        )}
      </div>
    </nav>
  );
}

export default Header;
