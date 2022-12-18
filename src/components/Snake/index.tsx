import { SIZE } from "../globals";
import "./index.css";

type Props = {
  snakeCells: number[][];
};

const Snake = ({ snakeCells }: Props) => {
  const head = snakeCells[snakeCells.length - 1];

  const headStyle = {
    width: `${SIZE}%`,
    height: `${SIZE}%`,
    left: `${head?.[0]}%`,
    top: `${head?.[1]}%`,
  };

  return (
    <>
      {snakeCells.map((position, index) => {
        const style = {
          width: `${SIZE}%`,
          height: `${SIZE}%`,
          left: `${position[0]}%`,
          top: `${position[1]}%`,
        };
        return <div key={index} className="snakeCell" style={style}></div>;
      })}
      <div className="snakeCell head" style={headStyle}></div>
    </>
  );
};
export default Snake;
