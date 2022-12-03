import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_3/input.txt",
  parseFn: (input) =>
    input.map((code) => [
      code.slice(0, Math.ceil(code.length / 2)),
      code.slice(Math.ceil(code.length / 2)),
    ]),
});

const commonCharacter = ([comp1, comp2]) => {
  for (let c of comp2) {
    if (comp1.includes(c)) return c;
  }
};

const characterPriority = (character) =>
  character.charCodeAt() - (character.toLowerCase() === character ? 96 : 38);

const result = input
  .map(commonCharacter)
  .map(characterPriority)
  .reduce((acc, val) => acc + val, 0);

console.log(result);
