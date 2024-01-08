import React, { useEffect, useState } from 'react';
import './CardDetail.css'
import { getApi, toolApi } from '../../services/api';
import { useAuth } from '../../utils/provider';

function CardDetail({ car, onClose }) {
    const { accessToken  } = useAuth();

    const [options, setOptions] = useState([]);
    const [totalOptionsPrice, setTotalOptionsPrice] = useState(0);

    useEffect(() => {
        if(car) {
            getApi.getByModelId(car.id, accessToken)
            .then(res => {
                setOptions(res);
                const optionsPrice = res.reduce((acc, opt) => {
                    if (opt.is_primary) {
                      return acc + opt.prize;
                    }
                    return acc;
                  }, 0);
                setTotalOptionsPrice(optionsPrice);
              
            })
            .catch(error => {
              console.error(error);
            });       
        }
        
      }, [car]);


  return (
    <div className='card-detail'>
      <div className='close' onClick={onClose}>
            <i className='bx bx-x'></i>
        </div>
        <div className='head'>
            <img src={`http://localhost:8000/${car.image}`} alt={car.name} />
            <h6>{car.name}</h6>
        </div>
         
        <h3>Détail de la voiture</h3>
        <ul>
        {
        options.map((opt, index) => (
            opt.is_primary && (
            <li key={index}>
                <p>{opt.name}</p>
                <span>{opt.prize} €</span>
            </li>
            )
        ))
        }
   
        </ul>
        <p className='my-3'>Prix: {car.prize + totalOptionsPrice} €</p>
        <button>Acheter</button>
    </div>
);
}

export default CardDetail;
