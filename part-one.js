const fs = require('fs');
createBingoCard('./input.txt');

function createBingoCard(filePath) {
  // read the file and split it into an array of lines
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  // split the first line (called numbers) into an array
  const calledNumbers = lines[0].split(',');
  const calledNumbersInt = calledNumbers.map((number) => parseInt(number, 10));

  // create an empty bingoCard array
  const bingoCard = [];

  // iterate through the remaining lines and add them to the bingoCard array
  for (let i = 1; i < lines.length; i++) {
    const bingoNumbers = lines[i].replace('\r', '');
    // split the line by the comma character (',')
    const bingoNumbersArray = bingoNumbers.split(' ');
    // convert the elements of the array to integers using parseInt
    const bingoNumbersInt = bingoNumbersArray.map((number) => parseInt(number, 10));
    // remove the NaN values
    const filteredBingoNumbersInt = bingoNumbersInt.filter(value => !isNaN(value));
    bingoCard.push(filteredBingoNumbersInt);
  }

  const grid = bingoCard;
  const callNumbers = calledNumbersInt;

  // flag variable to track whether the row or column with 5 'X' has been found
  let found = false;

  // iterate through the callNumbers array
  for (let i = 0; i < callNumbers.length; i++) {
    // find the element in the grid array and mark it with an 'X'
    for (let j = 0; j < grid.length; j++) {
      for (let k = 0; k < grid[j].length; k++) {
        if (grid[j][k] === callNumbers[i]) {
          grid[j][k] = 'X';

          // check if there is a row or column with 5 'X'
          let rowCount = 0;
          let colCount = 0;
          for (let l = 0; l < grid.length; l++) {
            if (grid[j][l] === 'X') rowCount++;
            if (grid[l][k] === 'X') colCount++;
          }

          // if a row or column has 5 'X', set the flag variable to true and break out of the inner loops
          if (rowCount === 5 || colCount === 5) {
            found = true;
            break;
          }
        }
      }
      // if the row or column with 5 'X' has been found, break out of the middle loop
      if (found) break;
    }
    // if the row or column with 5 'X' has been found, break out of the outer loop
    if (found) break;
  }

  // if the flag variable is true, return the marked board
  if (found) console.log(grid, "This board will get BINGO!");
}
