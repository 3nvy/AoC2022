import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_2/input.txt",
  parseFn: (input) =>
    input.map((row) =>
      row
        .replace(/[A]/g, 1)
        .replace(/[B]/g, 2)
        .replace(/[C_Y]/g, 3)
        .replace(/[X]/g, 0)
        .replace(/[Z]/g, 6)
    ), // Replace letters with their respective weight
});

// Calculate next hand taking extremities into account
const getBestHand = (oponentHand, myHand) => {
  const rightHand = oponentHand + myHand;
  return rightHand > 3 ? 1 : rightHand < 1 ? 3 : rightHand;
};

const result = input.reduce((acc, round) => {
  const [elfScore, requiredHand] = round.split(" ").map((i) => +i);

  const myScore = getBestHand(
    elfScore,
    !requiredHand ? -1 : requiredHand === 6 ? 1 : 0
  );

  return acc + requiredHand + myScore;
}, 0);

console.log(result); //15442
