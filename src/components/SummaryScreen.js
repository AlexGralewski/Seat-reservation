import React from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { selectChosenSeats, selectRefreshed } from "../redux/seatsSlice";

const SummaryScreen = () => {
  const chosenSeats = useSelector(selectChosenSeats);
  const refreshed = useSelector(selectRefreshed);

  switch (refreshed) {
    case true:
      return (
        <div className="refresh-alert">
          <h1>Aby wybrać miejsca, wróć na początek.</h1>
          <Link to="/">
            <Button>Powrót</Button>
          </Link>
        </div>
      );
    case false:
      return (
        <div className="summary-screen">
          <h1>Twoja rezerwacja przebiegła pomyślnie!</h1>
          <p>Wybrałeś miejsca:</p>
          <ul>
            {chosenSeats.map((seat) => (
              <li>
                rząd {seat[1]}, miejsce{" "}
                {seat.length == 3 ? seat[2] : seat[2] + seat[3]} ({seat})
              </li>
            ))}
          </ul>
          <h2>
            Dziękujemy! W razie problemów prosimy o kontakt z działem
            administracji.
          </h2>
        </div>
      );
  }
};

export default SummaryScreen;
