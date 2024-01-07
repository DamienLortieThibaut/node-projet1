// Custom.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Accounting.css'
import { buyApi } from '../../services/api';
import { useAuth } from '../../utils/provider';

function Accounting() {
  const { accessToken} = useAuth();
  const [buy, setbuy] = useState([]);

    useEffect(() => {
      buyApi.getAll(accessToken).then(data => console.log(data));

    }, [])
  return (
    <div className='accounting'>
        
    </div>
  );
}

export default Accounting;
