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

const scenicScoreFromDirection = (direction, { x, y }, originalPointValue) => {
  const nextX = x + direction.x;
  const nextY = y + direction.y;
  const nextValue = input[nextY]?.[nextX];

  if (!nextValue) return 0;

  if (nextValue >= +originalPointValue) return 1;

  return (
    1 +
    scenicScoreFromDirection(
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
  let maxScenicScore = 0;
  for (let x = 0; x < line.length; x++) {
    const scenicScore =
      scenicScoreFromDirection(DIRECTION.LEFT, { x, y }, line[x]) *
      scenicScoreFromDirection(DIRECTION.RIGHT, { x, y }, line[x]) *
      scenicScoreFromDirection(DIRECTION.UP, { x, y }, line[x]) *
      scenicScoreFromDirection(DIRECTION.DOWN, { x, y }, line[x]);

    maxScenicScore = Math.max(maxScenicScore, scenicScore);
  }
  return Math.max(acc, maxScenicScore);
}, 0);

console.log(visibleTrees); // 209880
