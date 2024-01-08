import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Accounting.css";
import { buyApi } from "../../services/api";
import { useAuth } from "../../utils/provider";

function Accounting() {
  const { accessToken } = useAuth();
  const [buys, setBuys] = useState([]);

  useEffect(() => {
    buyApi
      .getAll(accessToken)
      .then((data) => setBuys(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des achats:", error)
      );
  }, [accessToken]);

  return (
    <div className="accounting">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prix</th>
            <th>Date</th>
            <th>User ID</th>
            <th>Model ID</th>
          </tr>
        </thead>
        <tbody>
          {buys.map((buy) => (
            <tr key={buy.id}>
              <td>{buy.id}</td>
              <td>{buy.prize}</td>
              <td>{buy.date}</td>
              <td>
                {buy.firstname + ' '} 
                {buy.lastname}
              </td>
              <td>{buy.model}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Accounting;
