import React from 'react';
import './Footer.css'

function Footer() {
  return (


<footer>
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h3>Contactez-nous</h3>
        <p>Email: info@raudicars.com</p>
        <p>Téléphone: +33 123 456 789</p>
      </div>
      <div className="col-md-6">
        <h3>Suivez-nous</h3>
        <p>Suivez-nous sur les réseaux sociaux pour les dernières mises à jour :</p>
      </div>
    </div>
  </div>

  <div className="bottom-bar">
    <p>&copy; 2024 Raudi Cars. Tous droits réservés.</p>
  </div>
</footer>

);
}

export default Footer;
