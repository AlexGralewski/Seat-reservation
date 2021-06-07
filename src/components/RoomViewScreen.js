import React, { useEffect, useState } from "react";
import {Button} from 'antd'


const RoomViewScreen = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/seats")
      .then((response) => response.json())
      .then((data) => setSeats(data));
  }, []);
  return (
    <div className="room-view-screen">
      <div className="seats">
        {seats.map((object) => {
          if (object.reserved) {
            return (
              <div
                className="seat reserved"
                key={object.id}
                style={{
                  position: "absolute",
                  left: object.cords.y * 55 + "px",
                  top: object.cords.x * 55 + "px",
                }}
              >
                {object.id}
              </div>
            );
          } else {
            return (
              <div
                className="seat"
                key={object.id}
                style={{
                  position: "absolute",
                  left: object.cords.y * 55 + "px",
                  top: object.cords.x * 55 + "px",
                }}
              >
                {object.id}
              </div>
            );
          }
        })}
      </div>
      <div className="legend">
        <div className="">
          <span className="seat" />
          <span>Miejsca dostępne</span>
        </div>
        <div className="">
          <span className="seat" />
          <span>Miejsca zarezerwowane</span>
        </div>
        <div className="">
          <span className="seat" />
          <span>Twój wybór</span>
        </div>
        <Button>Rezerwuj</Button>
      </div>
    </div>
  );
};

export default RoomViewScreen;
