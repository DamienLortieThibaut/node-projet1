import React, { useState, useEffect } from 'react';
import './Home.css';
import CardDetail from '../../components/card-detail/CardDetail';
import CardCar from '../../components/card-car/CardCar'
import { modelApi } from '../../services/api';
import { useAuth } from '../../utils/provider';


function Home() {

  const { accessToken } = useAuth();

  useEffect(() => {
    modelApi.getAllModels(accessToken).then(res => setCars(res));
  }, []);

  const [cars, setCars] = useState([]);
  const [showCardDetail, setShowCardDetail] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);

  const handleCloseCardDetail = () => {
    setShowCardDetail(false);
  };


  return (
    <div className='home'>
      {showCardDetail && <CardDetail car={currentDetail} onClose={handleCloseCardDetail} />}
      <div className='main'>
        <button>Acheter maintenant</button>
        <div className='detail'>
          <div className='barre-style'></div>
          <h4>Raudi R1</h4>
          <p>Voiture parfaite pour vos sorties le weekend et vous faire plaisir ! <br /> Lier vitesse et confort</p>
        </div>
        <img className='background' src='/images/car.png' />
      </div>
      <div className='models'>
        <div className='title'>
          <h3>Choissisez un autre modèle</h3>
         <div className='barre'></div>
        </div>
        <div className='others'>
          <div className='card-section'>
            <h6>Nos modèles</h6>
            <p>Explorez notre gamme complète de modèles de voitures et trouvez celle qui correspond parfaitement à vos besoins. Choisissez l'excellence sur la route avec nos véhicules alliant élégance, performance et polyvalence.</p>
          </div>
          <div className='cars'>
            {cars.map((car, index) => (
              <CardCar key={index} car={car} loadDetail={setCurrentDetail} showCard={setShowCardDetail}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;