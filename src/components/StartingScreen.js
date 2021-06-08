import React from "react";
import { Link } from "react-router-dom";
import { Button, InputNumber, Checkbox } from "antd";

const StartingScreen = () => {
  return (
    <div className="starting-screen">
      <div className="container">
        <span>Liczba miejsc:</span>
        <InputNumber size="large" min={1} max={30} defaultValue={1} />
      </div>
      <Checkbox> Czy miejsca mają być obok siebie? </Checkbox>
      <Link to="/choose-seats">
        <Button>Wybierz miejsca</Button>
      </Link>
    </div>
  );
};

export default StartingScreen;
