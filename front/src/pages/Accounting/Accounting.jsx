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
  const [monthsOptions, setMonthsOptions] = useState([]);
  const [yearsOptions, setYearsOptions] = useState([]);
  const [totalPrize, setTotalPrize] = useState(0);

  const formatMonth = (month) => {
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const formattedMonth = parseInt(month, 10);
    if (formattedMonth >= 1 && formattedMonth <= 12) {
      return monthNames[formattedMonth - 1];
    }

    return "";
  };

  const formattedDate = (date) => {
    const formattedDateString = new Date(date).toLocaleString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    });

    return formattedDateString;
  };

  useEffect(() => {
    const filteredBuys = buys.filter((buy) => {
      const buyDate = new Date(buy.date);
      const buyMonth = buyDate.getMonth() + 1;
      const buyYear = buyDate.getFullYear();
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
    setTotalPrize(total.toFixed(2));
  };

  useEffect(() => {
    // Charger tous les achats au montage initial
    buyApi
      .getAll(accessToken)
      .then((data) => {
        setBuys(data);

        // Extraire les mois et années uniques des dates des achats
        const uniqueMonths = [
          ...new Set(data.map((buy) => new Date(buy.date).getMonth() + 1)),
        ];
        const uniqueYears = [
          ...new Set(data.map((buy) => new Date(buy.date).getFullYear())),
        ];

        // Tri des mois et années de manière croissante
        uniqueMonths.sort((a, b) => a - b);
        uniqueYears.sort((a, b) => a - b);

        // Ajout des options "Tous les mois" et "Toutes les années"
        setMonthsOptions(["00", ...uniqueMonths]);
        setYearsOptions(["00", ...uniqueYears]);
      })
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
          {monthsOptions.map((month) => (
            <option key={month} value={month}>
              {month === "00" ? "Tous les mois" : formatMonth(month)}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => handleFilterChange("year", e.target.value)}
        >
          {yearsOptions.map((year) => (
            <option key={year} value={year}>
              {year === "00" ? "Toutes les années" : year}
            </option>
          ))}
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
          {buys.map((buy) => {
            const buyDate = new Date(buy.date);
            const buyMonth = buyDate.getMonth() + 1;
            const buyYear = buyDate.getFullYear();
            if (
              (selectedMonth === "00" ||
                selectedMonth === "" ||
                buyMonth === parseInt(selectedMonth, 10)) &&
              (selectedYear === "00" ||
                selectedYear === "" ||
                buyYear === parseInt(selectedYear, 10))
            ) {
              return (
                <tr key={buy.id}>
                  <td>{buy.id}</td>
                  <td>{buy.prize}</td>
                  <td>{formattedDate(buy.date)}</td>
                  <td>
                    {buy.firstname + " "}
                    {buy.lastname}
                  </td>
                  <td>{buy.model}</td>
                </tr>
              );
            } else {
              // Ne pas rendre la ligne si elle ne correspond pas aux filtres
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Accounting;
