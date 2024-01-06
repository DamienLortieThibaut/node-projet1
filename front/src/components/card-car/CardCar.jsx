import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardCar.css';
import { isAuthenticated } from '../../utils/helpers';

function CardCar({ car, loadDetail, showCard }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isAuthenticated()) {
      const customUrl = `http://localhost:5173/custom/${car.id}`;
      window.open(customUrl, '_blank');
    } else {
      loadDetail(car);
      showCard(true);
    }
  };

  return (
    <div className='card-car' onClick={handleCardClick}>
      <img src={`http://localhost:8000/${car.image}`} alt={car.name} />
      <div className='info'>
        <h5 className='m-0'>{car.name}</h5>
        <p className='m-0'>{car.prize}€</p>
      </div>
    </div>
  );
}

export default CardCar;
