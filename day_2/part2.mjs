import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_2/input.txt",
  parseFn: (input) =>
    input.map((row) =>
      row
        .replace(/[A]/g, 1)
        .replace(/[B]/g, 2)
        .replace(/[C]/g, 3)
        .replace(/[X]/g, 0)
        .replace(/[Y]/g, 3)
        .replace(/[Z]/g, 6)
    ), // Replace letters with their respective weight
});

// Calculate next hand taking extremities into account
const getRightHandWeight = (oponentHand, myHand) => {
  const rightHand = oponentHand + myHand;
  if (rightHand > 3) return 1;
  else if (rightHand < 1) return 3;
  else return rightHand;
};

const result = input.reduce((acc, round) => {
  const [elfScore, requiredHand] = round.split(" ").map((i) => +i);

  const myScore = getRightHandWeight(elfScore, !requiredHand ? -1 : requiredHand === 6 ? 1 : 0)

  return acc + requiredHand + myScore;

}, 0);

console.log(result);
