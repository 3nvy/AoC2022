import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_8/input.txt",
});

const DIRECTION = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const isVisibleFromDirection = (direction, { x, y }, originalPointValue) => {
  const nextX = x + direction.x;
  const nextY = y + direction.y;
  const nextValue = input[nextY]?.[nextX];

  if (!nextValue) return true;

  return (
    nextValue < +originalPointValue &&
    isVisibleFromDirection(
      direction,
      {
        x: nextX,
        y: nextY,
      },
      originalPointValue
    )
  );
};

const visibleTrees = input.reduce((acc, line, y) => {
  let visibleTreeCount = 0;
  for (let x = 0; x < line.length; x++) {
    const isVisible =
      isVisibleFromDirection(DIRECTION.LEFT, { x, y }, line[x]) ||
      isVisibleFromDirection(DIRECTION.RIGHT, { x, y }, line[x]) ||
      isVisibleFromDirection(DIRECTION.UP, { x, y }, line[x]) ||
      isVisibleFromDirection(DIRECTION.DOWN, { x, y }, line[x]);

    if (isVisible) visibleTreeCount++;
  }
  return acc + visibleTreeCount;
}, 0);

console.log(visibleTrees); // 1801
