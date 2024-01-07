import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../services/api';
import './Login.css';
import { useAuth } from '../../utils/provider';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const credentials = {
      email,
      password,
    };

    userApi.login(credentials)
      .then(response => {
        const { token } = response;
        updateAccessToken(token);
        console.log('Connexion réussie. Token stocké:', token);
        navigate('/');
      })
      .catch(error => {
        console.error('Erreur lors de la connexion:', error);
      });
  };

  return (
    <div className='login'>
      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <form className="login-form">
          <label className="login-label">
            Email:
            <input className="login-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label className="login-label">
            Password:
            <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button className="login-button" type="button" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
