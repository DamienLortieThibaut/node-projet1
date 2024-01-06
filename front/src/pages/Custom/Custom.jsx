// Custom.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Custom.css'
import { modelApi, getApi } from '../../services/api';

function Custom() {
    const { id } = useParams();

    useEffect(() => {

    }, [])


  return (
    <div className='custom'>
        <div>
             <img />
        </div>
       <div>
            <div>
                <h3>Kit de base</h3>
                <div>

                </div>
            </div>
            <div>
                <h3>Options</h3>
                <div>
                    
                </div>
            </div>
            <div>
                <p>Prize: </p>
                <button>Acheter</button>
            </div>
       </div>
    </div>
  );
}

export default Custom;
