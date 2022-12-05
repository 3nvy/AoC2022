import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_4/input.txt",
  parseFn: (input) => input.map(row => row.split(/[-,]/).map(val => +val)),
});

const result = input.reduce((acc, s) => {
    if(!(s[1] < s[2] || s[3] < s[0])) acc++
    return acc;
} , 0)

console.log(result)