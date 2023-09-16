/**
 * Finds the coordinates [x,y] or [row, column] position
 * for a given goal map matrix[][].
 * 
 * @param word the word to search and find.
 * @param matrix the given goal map matrix[][].
 * @returns a matrix of type number[][] with the results of word finds [[row, column],...[row,column]].
 **/

const findWordPositions = (word: string, matrix: string[][]): number[][] => {
    const positions: number[][] = [];

    matrix.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === word) {
          positions.push([rowIndex, colIndex]);
        }
      });
    });

    return positions;
  };

  export default findWordPositions;