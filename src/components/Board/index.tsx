import { useCallback, useEffect, useState } from "react";
import Food from "../Food";
import Snake from "../Snake";
import {
  SPEED,
  DIRECTION,
  initialState,
  SIZE,
  getRandomPosition,
} from "../globals";
import "./index.css";

type Props = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
};

const Board = ({ setScore, setGameOver, score }: Props) => {
  const [snakeCells, setSnakeCells] = useState<number[][]>(
    initialState.snakeCells
  );
  const [food, setFood] = useState<number[]>(initialState.food);
  const [direction, setDirection] = useState<string | null>(
    initialState.direction
  );
  const [pause, setPause] = useState(true);

  useEffect(() => {
    if (pause) return;

    onBorderHit();
    onEatItself();

    const interval = setInterval(() => onMove(snakeCells, ateFood()), SPEED);
    return () => clearInterval(interval);
  }, [snakeCells, pause]);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setPause(!pause);
        setGameOver(false);
        return;
      }
      switch (e.key) {
        case DIRECTION.UP:
          ![DIRECTION.DOWN, DIRECTION.UP, null].includes(direction) &&
            setDirection(DIRECTION.UP);
          break;
        case DIRECTION.DOWN:
          ![DIRECTION.DOWN, DIRECTION.UP, null].includes(direction) &&
            setDirection(DIRECTION.DOWN);
          break;
        case DIRECTION.LEFT:
          ![DIRECTION.LEFT, DIRECTION.RIGHT, null].includes(direction) &&
            setDirection(DIRECTION.LEFT);
          break;
        case DIRECTION.RIGHT:
          ![DIRECTION.LEFT, DIRECTION.RIGHT, null].includes(direction) &&
            setDirection(DIRECTION.RIGHT);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, [direction, setDirection, pause, setPause]);

  const onMove = useCallback(
    (snakeCells: number[][], ate: boolean) => {
      let cells = [...snakeCells];
      let head = cells[cells.length - 1];
      switch (direction) {
        case DIRECTION.UP:
          head = [head[0], head[1] - SIZE];
          break;
        case DIRECTION.LEFT:
          head = [head[0] - SIZE, head[1]];
          break;
        case DIRECTION.RIGHT:
          head = [head[0] + SIZE, head[1]];
          break;
        case DIRECTION.DOWN:
          head = [head[0], head[1] + SIZE];
          break;
        default:
          break;
      }
      if (direction) {
        cells.push(head);
        ate ? setFood(getRandomPosition(cells)) : cells.shift();
        setSnakeCells([...cells]);
      }
    },
    [direction]
  );

  const ateFood = () => {
    let head = snakeCells[snakeCells.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setScore((score) => score + 1);
    }
    return head[0] === food[0] && head[1] === food[1];
  };

  const onBorderHit = () => {
    let head = snakeCells[snakeCells.length - 1];

    if (head[0] >= 99 || head[0] < 0 || head[1] >= 99 || head[1] < 0) {
      onGameOver();
    }
  };

  const onEatItself = () => {
    let cells = [...snakeCells];
    let head = cells[cells.length - 1];
    cells.pop();

    cells.forEach((cell) => {
      if (head[0] === cell[0] && head[1] === cell[1]) {
        onGameOver();
      }
    });
  };

  const onGameOver = () => {
    setSnakeCells([...initialState.snakeCells]);
    setFood(initialState.food);
    setDirection(initialState.direction);
    setGameOver(true);
    setPause(true);
  };

  return (
    <div className="board">
      <div className="scorediv">{score}</div>
      <Snake snakeCells={snakeCells} />
      <Food food={food} />
    </div>
  );
};
export default Board;
