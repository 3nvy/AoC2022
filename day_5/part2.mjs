import { readInput } from "../utils.mjs";

const [piles, instructions] = readInput({
  filePath: "day_5/input.txt",
  devideByGroup: true,

  /**
   * Initialize the piles with the initial graph from the input
   */
  parseFn: (input) => {
    const graphSize = +input[0].pop().at(-2);

    const piles = input[0].reduce(
      (acc, row) => {
        for (let i = 1; i < row.length; i += 4)
          if (row.at(i).trim()) acc[Math.floor(i / 4)].unshift(row.at(i));

        return acc;
      },
      Array(graphSize)
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
