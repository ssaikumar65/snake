import { SIZE } from "../globals";
import "./index.css";

type Props = {
  food: number[];
};

const Food = ({ food }: Props) => {
  const style = {
    width: `${SIZE}%`,
    height: `${SIZE}%`,
    left: `${food[0]}%`,
    top: `${food[1]}%`,
  };
  return <div className="food" style={style}></div>;
};
export default Food;
