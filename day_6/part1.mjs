import { readInput } from "../utils.mjs";

const [code] = readInput({
  filePath: "day_6/input.txt",
});

let markerSet = new Set();
let markerIndex = 0;

const shiftSet = (character, prevSetSize) => {
  markerSet.delete(markerSet.values().next().value);
  markerSet.add(character);

  return prevSetSize === markerSet.size || shiftSet(character, markerSet.size);
};

for (let i = 0; i < code.length; i++) {
  const prevSetSize = markerSet.size;
  markerSet.add(code[i]);

  if (markerSet.size === 4) {
    markerIndex = i + 1;
    break;
  } else if (prevSetSize === markerSet.size) {
    shiftSet(code[i], markerSet.size);
  }
}

console.log(markerIndex); //15422
