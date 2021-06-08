import React, { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const RoomViewScreen = () => {
  const hasFetchedData = useRef(false);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, selectSeats] = useState([]);
  const numberOfSeats = 3;
  const connected = true;

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
  }, [seats, connected]);

  // handles seat click
  const selectSeat = (e) => {
    const { id } = e.target;
    if (selectedSeats.includes(id)) {
      let index = selectedSeats.indexOf(id);
      selectedSeats.splice(index, 1);
      e.target.className = "seat";
    } else {
      if (selectedSeats.length < numberOfSeats) {
        selectedSeats.push(id);
        e.target.className = "seat selected";
      } else {
        alert("Maximum number of seats is selected.");
      }
    }
    console.log(selectedSeats);
  };

  return (
    <div className="room-view-screen">
      <div className="seats">
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
        <Link to="/summary">
          <Button>Rezerwuj</Button>
        </Link>
      </div>
    </div>
  );
};

export default RoomViewScreen;
