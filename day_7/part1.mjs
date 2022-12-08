import { readInput } from "../utils.mjs";

const input = readInput({
  filePath: "day_7/input.txt",
});

let currentPath = "/";
const folderTree = {};

const navigateToFolder = (path) => {
  // If the path record exists and we are navigating away, it means the total folder size has been calculated
  if (folderTree[currentPath]) folderTree[currentPath].hasBeenCalculated = true;

  if (path === "/") currentPath = "/";
  else if (path === "..") {
    if (currentPath !== "/") currentPath = currentPath.slice(0, -2);
  } else currentPath += `${path}/`;
};

const increaseFolderSizes = (size) => {
  if (!folderTree[currentPath].hasBeenCalculated) {
    const parentFolders = currentPath.slice(0, -2)?.match(/\//g)?.length || 0;

    folderTree[currentPath].size += size; // Increases current folder

    for (let i = 0; i < parentFolders; i++) {
      const parentFolderIdx = currentPath.slice(0, -2 * (i + 1));
      if (!folderTree[parentFolderIdx])
        folderTree[parentFolderIdx] = { size: 0, hasBeenCalculated: false };
      folderTree[parentFolderIdx].size += size;
    }
  }
};

for (let log of input) {
  const [c1, c2, c3] = log.split(" ");

  if (c1 === "$" && c2 === "cd") {
    navigateToFolder(c3);
  } else if (c1 === "$" && c2 === "ls" && !folderTree[currentPath]) {
    folderTree[currentPath] = { size: 0, hasBeenCalculated: false };
  } else if (!isNaN(c1)) {
    increaseFolderSizes(+c1);
  }
}

const result = Object.values(folderTree).reduce(
  (acc, { size }) => (size <= 100000 ? acc + size : acc),
  0
);

console.log(result);
