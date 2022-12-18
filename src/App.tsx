import Board from "./components/Board";
import { useState } from "react";

const App = () => {
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const onGameOver = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="app">
      {gameOver ? (
        <div className="gameover">
          <span>Game Over</span>
          <span>Score : {score}</span>
          <button onClick={onGameOver}>Start Over</button>
        </div>
      ) : (
        <>
          <span className="snake">SNAKE</span>
          <Board score={score} setScore={setScore} setGameOver={setGameOver} />
          <span>Press SPACEBAR to Play/Pause.</span>
        </>
      )}
    </div>
  );
};

export default App;
