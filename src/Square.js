import { getColorFromNumber } from "./utils";

const Square = ({ i, color }) => {
  const MIN = -100;
  const MAX = 100;
  const number = Math.random() * (MAX - MIN) + MIN;
  return (
    <div className="square" key={i} style={{ backgroundColor: getColorFromNumber(number) }} />
  )
}


export default Square;