import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_1/input.txt",
  devideByGroup: true,
});

const maximumCalories = input
  .map((is) => is.reduce((acc, val) => acc + +val, 0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, val) => acc + val, 0);

console.log(maximumCalories);
