import { readInput } from "../utils.mjs";

const sliceIntoChunks = (arr, chunkSize = 3) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    res.push(arr.slice(i, i + chunkSize));
  }
  return res;
};

const input = readInput({
  filePath: "day_3/input.txt",
  parseFn: sliceIntoChunks,
});

const commonCharacter = (rucksack1, rucksack2) => {
  const commonCharacters = new Set();
  for (let c of rucksack1) {
    if (rucksack2.includes(c)) commonCharacters.add(c);
  }

  const arrayFromSet = Array.from(commonCharacters);
  return arrayFromSet.length === 1 ? arrayFromSet[0] : arrayFromSet;
};

const characterPriority = (character) =>
  character.charCodeAt() - (character.toLowerCase() === character ? 96 : 38);

const result = input
  .map((rucksacks) =>
    commonCharacter(commonCharacter(rucksacks[0], rucksacks[1]), rucksacks[2])
  )
  .map(characterPriority)
  .reduce((acc, val) => acc + val, 0);

console.log(result);
