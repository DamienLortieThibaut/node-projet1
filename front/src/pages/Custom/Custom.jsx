// Custom.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Custom.css";
import { modelApi, getApi, buyApi } from "../../services/api";
import { useAuth } from "../../utils/provider";
import { getIdFromToken } from "../../utils/helper";

function Custom() {
  const { id } = useParams();
  const [tools, setTools] = useState([]);
  const [car, setCar] = useState(null)
  const [sum, setSum] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0)
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrimaryTools = async () => {
      try {
        const response = await getApi.getByModelId(id, accessToken);

        // Add the 'selected' field to each object in the array
        const modifiedResponse = response.map((tool) => ({
          ...tool,
          selected: false, // You can set the initial value as per your requirement
        }));

        setTools(modifiedResponse);
      } catch (error) {
        console.error("Error fetching primary tools:", error);
      }
    };
    fetchPrimaryTools();

    modelApi.getModelById(id, accessToken).then(data => setCar(data));
  }, []);

  useEffect(() => {
    if (car) {
      totalPrizeFunc(car);
    }

  }, [tools, car]);


  const handleDivClick = (toolId) => {
    setTools((prevTools) => {
      return prevTools.map((tool) =>
        tool.id === toolId ? { ...tool, selected: !tool.selected } : tool
      );
    });
  };

  const totalPrizeFunc = (elem) => {
    const sum = tools.reduce((accumulator, tool) => {
      if (tool.is_primary || tool.selected) {
        return accumulator + tool.prize;
      }
      return accumulator;
    }, elem.prize);
    setTotalPrize(sum);
  };

  const buyCar = () => {
    const currentDate = new Date().toISOString();

    const body = {
      prize: totalPrize,
      userId: getIdFromToken(accessToken),
      modelId: car.id,
      date: currentDate,
    };

    buyApi.add(body, accessToken)
      .then(data => {
        navigate("/");
      })
      .catch(error => {
        console.error("Error purchasing car:", error);
      });
  };

  return (
    <div className="custom d-flex">
      <div className="w-50 d-flex flex-column justify-content-between">
        {car &&
          (
            <div className="car">
              <img src={`http://localhost:8000/${car.image}`} alt={car.name} />
                <h5>{car.name}</h5>
              <p>{car.description}</p>
            </div>
          )}

        <div className="equipement">
          <h3>Equipement</h3>
          <div>
            {tools.map(tool => (
              tool.is_primary ? (
                <p key={tool.id}>{tool.name}</p>
              ) : null
            ))

            }
          </div>
        </div>
      </div>
      <div className="tools-option w-50 d-flex flex-column justify-content-between h-100">
        <div>
          <h3>Sélectioner vos options</h3>
          <div className="w-100">
            {tools.map((tool) => (
              !tool.is_primary ? (
                <div
                  className={`detailTool d-flex justify-content-between align-items-center ${tool.selected ? 'selected' : ''}`}
                  key={tool.id}
                  onClick={() => handleDivClick(tool.id)}
                >
                  <div className="d-flex align-items-center">
                    {tool.selected ? (<i className='bx bx-check' ></i>) : (<i className='bx bx-plus'></i>)}
                    <p>{tool.name}</p>
                  </div>
                  <p>{tool.prize} €</p>
                </div>
              ) : null
            ))}
          </div>
        </div>
        <div>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <p>Total</p>
            <p className="total">{totalPrize}€</p>

          </div>
          <button onClick={buyCar}>Acheter</button>
        </div>
      </div>
    </div>
  );
}

export default Custom;
