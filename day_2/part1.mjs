import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_2/input.txt",
  parseFn: (input) =>
    input.map((row) =>
      row.replace(/[A_X]/g, 1).replace(/[B_Y]/g, 2).replace(/[C_Z]/g, 3)
    ), // Replace letters with their respective weight
});

const result = input.reduce((acc, round) => {
  const [elfScore, myScore] = round.split(" ").map((i) => +i);

  const roundResult = elfScore - myScore;

  // Round ended up in a draw
  if (!roundResult) return acc + 3 + myScore;
  // Round ends up with you lost
  // Logic being that the difference is either 1, which implies the gnome has used a higher hand, or -2 (Rock < Scissor)
  else if (roundResult === 1 || roundResult === -2) return acc + 0 + myScore;
  // Round ends up with you winning
  else return acc + 6 + myScore;
}, 0);

console.log(result); //15422
