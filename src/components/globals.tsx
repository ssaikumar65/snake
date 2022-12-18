export const SPEED: number = 200;
export const SIZE: number = 4;
export const POSITION: number[][] = [
  [40, 40],
  [44, 40],
];
export const DIRECTION = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};

export const getRandomPosition = (pos: number[][]): number[] => {
  let max = 98;
  let min = 1;
  const x = Math.floor((Math.random() * (max + min)) / SIZE) * SIZE;
  const y = Math.floor((Math.random() * (max + min)) / SIZE) * SIZE;

  if (!pos.some((e) => e[0] === x && e[1] === y)) {
    return [x, y];
  }
  return getRandomPosition(pos);
};

export const initialState = {
  snakeCells: POSITION,
  food: getRandomPosition(POSITION),
  direction: DIRECTION.RIGHT,
};
