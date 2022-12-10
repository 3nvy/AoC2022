import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_7/input.txt",
});

let currentPath = ["/"];
const folderTree = {
  "/": {},
};

const parsedCurrentPath = () => `['${currentPath.join("']['")}']`;

const navigateToFolder = (path) => {
  // If path is already root, just stay in root
  if (path === "/") currentPath = ["/"];
  //
  else if (path === "..") currentPath.pop();
  // Otherwise, we are navigating into a new folder, so we need ot add it to the current path
  else {
    // Check if folder exist in folderTree, and create if it doesnt
    if (!eval(`folderTree${parsedCurrentPath()}["${path}"]`)) {
      eval(`folderTree${parsedCurrentPath()}`)[path] = {};
    }
    currentPath.push(path);
  }
};

const getPathSize = (path, criteriaSizes) => {
  let totalForPath = 0;
  for (let sizeOrPath of Object.values(path)) {
    if (isNaN(sizeOrPath))
      totalForPath += getPathSize(sizeOrPath, criteriaSizes);
    else totalForPath += sizeOrPath;
  }

  criteriaSizes.push(totalForPath);
  return totalForPath;
};

// Build Tree
for (let log of input) {
  // Splits logs
  const [c1, c2, c3] = log.split(" ");

  // If the log is a cd, navigate to c3
  if (c1 === "$" && c2 === "cd") {
    navigateToFolder(c3);

    // If the log is an ls and the current path isnt logged,
  } else if (!isNaN(c1)) {
    eval(`folderTree${parsedCurrentPath()}`)[`${c2}`] = +c1;
  }
}

const criteriaSizes = [];
const fileSystemSize = getPathSize(folderTree["/"], criteriaSizes);

const neededFreeSpace = fileSystemSize - (70000000 - 30000000);

const candidatesForRelease = criteriaSizes.filter(
  (size) => size >= neededFreeSpace
);
console.log(Math.min(...candidatesForRelease)); //9608311
