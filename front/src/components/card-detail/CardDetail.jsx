import React, { useEffect } from 'react';
import './CardDetail.css'
import { getApi, toolApi } from '../../services/api';

function CardDetail({ car, onClose }) {

    useEffect(() => {
        if(car) {
            getApi.getByModelId(car.id)
            .then(res => {
                console.log(res)
              
            })
            .catch(error => {
              console.error(error);
            });       
        }
        
      }, [car]);

  return (
    <div className='card-detail'>
      <div className='close' onClick={onClose}>
            <i class='bx bx-x'></i>
        </div>
        <div className='head'>
            <img src={`http://localhost:8000/${car.image}`} alt={car.name} />
            <h6>{car.name}</h6>
        </div>
         
        <h3>Détail de la voiture</h3>
        <ul>
            <li>

            </li>
        </ul>
        <p>Prix: {car.prize}</p>
        <button>Acheter</button>
    </div>
);
}

export default CardDetail;
