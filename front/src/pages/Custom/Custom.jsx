// Custom.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Custom.css";
import { modelApi, getApi } from "../../services/api";

function Custom() {
  const { id } = useParams();
  const [Tools, setTools] = useState([]);

  useEffect(() => {
    const fetchPrimaryTools = async () => {
      try {
        const response = await getApi.getByModelId(id);
        setTools(response);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des outils obligatoires:",
          error
        );
      }
    };

    fetchPrimaryTools();
  }, []);

  return (
    <div className="custom">
      <div>
        <img />
      </div>
      <div>
        <div>
          <h3>Kit de base</h3>
          <div>
            {Tools.map(tool => (
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
          <div></div>
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
