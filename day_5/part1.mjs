import { readInput } from "../utils.mjs";

const [piles, instructions] = readInput({
  filePath: "day_5/input.txt",
  devideByGroup: true,

  /**
   * Initialize the piles with the initial graph from the input
   */
  parseFn: (input) => {
    const initialGraph = input[0]
      .map((row) =>
        row
          .replaceAll(/ {4}/gm, ".")
          .replaceAll(/[ \[\]]/g, "")
          .split("")
      )
      .slice(0, -1);

    const piles = initialGraph.reduce(
      (acc, pileValues) => {
        pileValues.forEach((pv, idx) => pv !== "." && acc[idx].unshift(pv));
        return acc;
      },
      Array(initialGraph[0].length)
        .fill(null)
        .map(() => [])
    );

    const instructions = input[1].map((instruction) =>
      instruction
        .replaceAll(/[movefromto]/g, "")
        .trim()
        .split(/\s+/)
    );

    return [piles, instructions];
  },
});

/**
 * Move the values from arrays trough the instructions
 */
for (let instruction of instructions) {
  const [tilesToMove, pileFromIdx, pileToIdx] = instruction;

  const valuesToMove = piles[pileFromIdx - 1].splice(
    piles[pileFromIdx - 1].length - tilesToMove,
    piles[pileFromIdx - 1].length
  );

  piles[pileToIdx - 1].push(...valuesToMove);
}

const result = piles.reduce((acc, pile) => acc + pile.pop(), "");

console.log(result);
