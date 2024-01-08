import React, { useState, useEffect } from "react";
import { userApi } from "../../services/api";
import "./Register.css";
import { useAuth } from "../../utils/provider";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { accessToken, updateAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    const user = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    };

    userApi
      .register(user)
      .then((response) => {
        const { token } = response;
        updateAccessToken(token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement:", error);
      });
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2 className="register-heading">Inscription</h2>
        <form className="register-form">
          <label className="register-label">
            Prénom :
            <input
              className="register-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br />
          <label className="register-label">
            Nom de famille :
            <input
              className="register-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <br />
          <label className="register-label">
            Email :
            <input
              className="register-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label className="register-label">
            Mot de passe :
            <input
              className="register-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button
            className="register-button"
            type="button"
            onClick={handleRegister}
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
