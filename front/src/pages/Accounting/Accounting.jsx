import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Accounting.css";
import { buyApi } from "../../services/api";
import { useAuth } from "../../utils/provider";

function Accounting() {
  const { accessToken } = useAuth();
  const [buys, setBuys] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [totalPrize, setTotalPrize] = useState(0);

  useEffect(() => {
    const filteredBuys = buys.filter((buy) => {
      const buyDate = new Date(buy.date);
      const buyMonth = buyDate.getMonth() + 1;
      const buyYear = buyDate.getFullYear();
      console.log(buyMonth);
      return (
        (selectedMonth === "00" ||
          selectedMonth === "" ||
          buyMonth === parseInt(selectedMonth, 10)) &&
        (selectedYear === "00" ||
          selectedYear === "" ||
          buyYear === parseInt(selectedYear, 10))
      );
    });

    calculateTotalPrize(filteredBuys);
  }, [buys, selectedMonth, selectedYear]);

  const handleFilterChange = (type, value) => {
    if (type === "month") {
      setSelectedMonth(value);
    } else if (type === "year") {
      setSelectedYear(value);
    }
  };

  const calculateTotalPrize = (buysData) => {
    const total = buysData.reduce((acc, buy) => acc + buy.prize, 0);
    setTotalPrize(total);
  };

  useEffect(() => {
    // Charger tous les achats au montage initial
    buyApi
      .getAll(accessToken)
      .then((data) => setBuys(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des achats:", error)
      );
  }, [accessToken]);

  return (
    <div className="accounting">
      <div className="filter">
        <select
          value={selectedMonth}
          onChange={(e) => handleFilterChange("month", e.target.value)}
        >
          <option value="00">Tous les mois</option>
          <option value="01">Janvier</option>
          <option value="02">Février</option>
          <option value="03">Mars</option>
          <option value="04">Avril</option>
          <option value="05">Mai</option>
          <option value="06">Juin</option>
          <option value="07">Juillet</option>
          <option value="08">Aout</option>
          <option value="09">Septembre</option>
          <option value="10">Octobre</option>
          <option value="11">Novembre</option>
          <option value="12">Décembre</option>

          {/* Ajoutez ici les options pour les mois */}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => handleFilterChange("year", e.target.value)}
        >
          <option value="00">Toutes les années</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          {/* Ajoutez ici les options pour les années */}
        </select>
        <div className="total-prize">Somme des prix : {totalPrize}</div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prix</th>
            <th>Date</th>
            <th>User</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {buys.map((buy) => (
            <tr key={buy.id}>
              <td>{buy.id}</td>
              <td>{buy.prize}</td>
              <td>{buy.date}</td>
              <td>
                {buy.firstname + " "}
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
