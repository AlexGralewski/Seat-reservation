import React, { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  setChosenSeats,
  selectNumberOfSeats,
  selectConnected,
  selectRefreshed,
} from "../redux/seatsSlice";
import { useSelector, useDispatch } from "react-redux";

const RoomViewScreen = () => {
  const hasFetchedData = useRef(false);
  const [seats, setSeats] = useState([]); // stores seats data from API
  const [selectedSeats, selectSeats] = useState([]); //stores seats selected by user (not confirmed)
  const numberOfSeats = useSelector(selectNumberOfSeats);
  const connected = useSelector(selectConnected);
  const refreshed = useSelector(selectRefreshed);
  const dispatch = useDispatch();

  // fetch seat API on load
  useEffect(() => {
    if (!hasFetchedData.current) {
      fetch("http://localhost:8000/seats")
        .then((response) => response.json())
        .then((data) => {
          setSeats(data);
          hasFetchedData.current = true;
        });
    }
  }, []);

  // proposes seats for the user based on choices of number of seats and wheter they should be directly next to each other
  useEffect(() => {
    if (hasFetchedData.current) {
      let validSeats = [];
      if (connected) {
        for (let i = 0; i < seats.length - numberOfSeats; i++) {
          if (validSeats.length === numberOfSeats) {
            selectSeats(validSeats);
            break;
          } else {
            if (!seats[i].reserved) {
              validSeats = [seats[i].id];
              for (let j = 1; j < numberOfSeats; j++) {
                if (
                  seats[i].cords.x === seats[i + j].cords.x &&
                  seats[i].cords.y === seats[i + j].cords.y - j &&
                  !seats[i + j].reserved
                ) {
                  validSeats.push(seats[i + j].id);
                } else {
                  break;
                }
              }
            }
          }
        }
      } else {
        for (let i = 0; i < seats.length; i++) {
          if (validSeats.length === numberOfSeats) {
            selectSeats(validSeats);
            break;
          } else {
            if (!seats[i].reserved) {
              validSeats.push(seats[i].id);
            }
          }
        }
      }
    }
  }, [seats, connected, numberOfSeats]);

  // handles seat click
  const selectSeat = (e) => {
    const { id } = e.target;
    if (selectedSeats.includes(id)) {
      selectSeats(selectedSeats.filter((value) => value !== id));

      e.target.className = "seat";
    } else {
      if (selectedSeats.length < numberOfSeats) {
        selectSeats([...selectedSeats, id]);
        e.target.className = "seat selected";
      } else {
        alert("Maximum number of seats is selected.");
      }
    }
    console.log(selectedSeats);
  };

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
        <div className="room-view-screen">
          <h2>
            Pozostałe miejsca do wybrania: {numberOfSeats - selectedSeats.length}
          </h2>
          <div className="seats" style={{ width: "820px", minHeight: "550px" }}>
            {seats.map((seat) => {
              if (seat.reserved) {
                return (
                  <div
                    className="seat reserved"
                    key={seat.id}
                    id={seat.id}
                    style={{
                      position: "absolute",
                      left: seat.cords.y * 55 + "px",
                      top: seat.cords.x * 55 + "px",
                    }}
                  />
                );
              } else {
                let seatClasses;
                if (selectedSeats.includes(seat.id)) {
                  seatClasses = "seat selected";
                } else {
                  seatClasses = "seat";
                }

                return (
                  <div
                    className={seatClasses}
                    key={seat.id}
                    id={seat.id}
                    style={{
                      position: "absolute",
                      left: seat.cords.y * 55 + "px",
                      top: seat.cords.x * 55 + "px",
                      cursor: "pointer",
                    }}
                    onClick={selectSeat}
                  />
                );
              }
            })}
          </div>
          <div className="legend">
            <div>
              <span className="seat" />
              <span>Miejsca dostępne</span>
            </div>
            <div>
              <span className="seat reserved" />
              <span>Miejsca zarezerwowane</span>
            </div>
            <div>
              <span className="seat selected" />
              <span>Twój wybór</span>
            </div>
            <Link
              to="/summary"
              style={
                numberOfSeats - selectedSeats.length === 0
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <Button onClick={dispatch(setChosenSeats(selectedSeats))}>
                Rezerwuj
              </Button>
            </Link>
          </div>
        </div>
      );
  }
};

export default RoomViewScreen;
