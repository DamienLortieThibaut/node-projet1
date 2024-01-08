import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { isAuthenticated } from '../../utils/helper';
import { useAuth } from '../../utils/provider';
import { hasRequiredRole } from '../../utils/helper';
function Header() {
  const { accessToken, updateAccessToken } = useAuth();

  const handleLogout = () => {
    updateAccessToken(null);
  };

  return (
    <nav>
      <div className='left'>
        <div className='logo'>
          <img id='img-logo' src='/images/logo.png' alt="Logo" />
          <p>RAUDI</p>
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          { hasRequiredRole(['admin'], accessToken) && (<li><Link to="/admin">Admin</Link></li>)}
          { hasRequiredRole(['accounter', 'admin'], accessToken) && ( <li><Link to="/accounting">Comptabilité</Link></li> ) }
        </ul>
      </div>
      <div className='action'>
        {!isAuthenticated(accessToken) && (
          <>
            <Link to="/register">
              <button id='register'>Register</button>
            </Link>
            <Link to="/login">
              <button id='login'>Login</button>
            </Link>
          </>
        )}
        {isAuthenticated(accessToken) && (
          <button id='logout' onClick={handleLogout}>Déconnexion</button>
        )}
      </div>
    </nav>
  );
}

export default Header;
