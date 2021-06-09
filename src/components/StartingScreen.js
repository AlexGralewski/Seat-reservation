import { Link } from "react-router-dom";
import { Button, InputNumber, Checkbox } from "antd";
import {
  selectNumberOfSeats,
  setNumberOfSeats,
  selectConnected,
  setConnected,
  setRefreshed,
  selectRefreshed,
} from "../redux/seatsSlice";
import { useSelector, useDispatch } from "react-redux";

const StartingScreen = () => {
  const numberOfSeats = useSelector(selectNumberOfSeats);
  const connected = useSelector(selectConnected);
  const refreshed = useSelector(selectRefreshed);
  const dispatch = useDispatch();
  return (
    <div className="starting-screen">
      <div className="container">
        <span>Liczba miejsc:</span>
        <InputNumber
          size="large"
          min={1}
          max={30}
          defaultValue={numberOfSeats}
          onChange={(v) => dispatch(setNumberOfSeats(v))}
        />
      </div>
      <Checkbox
        disabled={numberOfSeats === 1 ? true : false}
        checked={connected}
        onChange={() => dispatch(setConnected(!connected))}
      >

        Czy miejsca mają być obok siebie?
      </Checkbox>
      <Link
        to="/choose-seats"
        onClick={() => dispatch(setRefreshed(!refreshed))}
      >
        <Button>Wybierz miejsca</Button>
      </Link>
    </div>
  );
};

export default StartingScreen;
