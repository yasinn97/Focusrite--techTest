const fs = require('fs');
createBingoCard('./input2.txt');

function createBingoCard(filePath) {
  // read the file and split it into an array of lines
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  // split the first line (called numbers) into an array
  const calledNumbers = lines[0].split(',');
  const calledNumbersInt = calledNumbers.map((number) => parseInt(number, 10));

  // create an empty bingoCard array
  const bingoCards = [];

  // create an empty array for the current bingoCard
  let currentBingoCard = [];

  // iterate through the remaining lines
  for (let i = 1; i < lines.length; i++) {
    const bingoNumbers = lines[i].replace('\r', '');

    // if the line is empty, add the current bingoCard to the bingoCards array
    // and reset the currentBingoCard array
    if (bingoNumbers === '') {
      bingoCards.push(currentBingoCard);
      currentBingoCard = [];
    } else {
      // split the line by the space character (' ')
      const bingoNumbersArray = bingoNumbers.split(' ');
      // convert the elements of the array to integers using parseInt
      const bingoNumbersInt = bingoNumbersArray.map((number) => parseInt(number, 10));
      // remove the NaN values
      const filteredBingoNumbersInt = bingoNumbersInt.filter(value => !isNaN(value));
      currentBingoCard.push(filteredBingoNumbersInt);
    }
  }

  // add the final bingoCard to the bingoCards array
  bingoCards.push(currentBingoCard);

  for (let i = 0; i < calledNumbersInt.length; i++) {
    // find the element in all bingoCards and mark it with an 'X'
    for (let i = 0; i < calledNumbersInt.length; i++) {
        // find the element in all bingoCards and mark it with an 'X'
        for (let j = 0; j < bingoCards.length; j++) {
          let rowXCount;
          let colXCount;
          for (let k = 0; k < bingoCards[j].length; k++) {
            rowXCount = 0;
            colXCount = 0;
            for (let l = 0; l < bingoCards[j][k].length; l++) {
              if (bingoCards[j][k][l] === calledNumbersInt[i]) {
                bingoCards[j][k][l] = 'X';
              }
              if (bingoCards[j][k][l] === 'X') {
                rowXCount++;
              }
              if (bingoCards[j][l][k] === 'X') {
                colXCount++;
              }
            }
            if (rowXCount === 5 || colXCount === 5) {
              console.log(`Card ${j } will get BINGO first:`); 
              console.log(bingoCards[j]);
              return;
            }
          }
        }
    }
  }    
}