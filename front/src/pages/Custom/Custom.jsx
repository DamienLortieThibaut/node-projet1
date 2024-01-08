// Custom.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { accessToken} = useAuth();

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
    if(car){
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
    console.log(body)
  
    buyApi.add(body, accessToken)
      .then(data => {
        console.log("Car purchased successfully:", data);
        // Handle any additional logic after successful purchase
      })
      .catch(error => {
        console.error("Error purchasing car:", error);
        // Handle error scenarios
      });
  };

  return (
    <div className="custom">
      <div>
        <img />
      </div>
      <div>
        <div>
          <h3>Kit de base</h3>
          <div>
            {tools.map(tool => (
              tool.is_primary ? (
                <div key={tool.id}>
                  <p>Nom: {tool.name}</p>
                  <p>Prix: { tool.prize}</p>
                </div>
              ) : null
            ))

            }
          </div>
        </div>
        <div>
          <h3>Options</h3>
          <div>
          {tools.map((tool) => (
        !tool.is_primary ? (
          <div key={tool.id} onClick={() => handleDivClick(tool.id)}>
            <p>Nom: {tool.name}</p>
            <p>Prix: {tool.prize}</p>
          </div>
        ) : null
      ))}
          </div>
        </div>
        <div>
          <p>Prize: {totalPrize}€</p>
          <button onClick={buyCar}>Acheter</button>
        </div>
      </div>
    </div>
  );
}

export default Custom;
