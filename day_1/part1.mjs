import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_1/input.txt",
  devideByGroup: true,
});

const maximumCalories = Math.max(
  ...input.map((is) => is.reduce((acc, val) => acc + +val, 0))
);

console.log(maximumCalories);
