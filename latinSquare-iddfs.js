function isLatinSquare(matrix) {
  const size = matrix.length;

  // Check if each row contains distinct elements
  for (let i = 0; i < size; i++) {
    const rowSet = new Set(matrix[i].filter((num) => num !== 0));
    if (rowSet.size !== size) {
      return false;
    }
  }

  // Check if each column contains distinct elements
  for (let j = 0; j < size; j++) {
    const colSet = new Set(
      matrix.map((row) => row[j]).filter((num) => num !== 0)
    );
    if (colSet.size !== size) {
      return false;
    }
  }

  return true;
}

// Update possibilities after assigning a number to a cell
function updatePossibilities(matrix, possibilities, row, col, num) {
  const size = matrix.length;

  // Remove the chosen number from the possibilities in the same row and column
  for (let i = 0; i < size; i++) {
    possibilities[row][i].delete(num);
    possibilities[i][col].delete(num);
  }
}

function depthFirstSearch(matrix, possibilities, depth, maxDepth) {
  const size = matrix.length;

  if (depth === maxDepth) {
    if (isLatinSquare(matrix)) {
      return matrix;
    }
    return null;
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // Skip cells that are already filled
      if (matrix[i][j] !== 0) {
        continue;
      }

      // Try filling the cell with a number
      for (let num of possibilities[i][j]) {
        matrix[i][j] = num;
        updatePossibilities(matrix, possibilities, i, j, num);

        // Recursively explore the next level
        const result = depthFirstSearch(
          matrix,
          possibilities,
          depth + 1,
          maxDepth
        );

        if (result) {
          return result; // Return the solution
        }

        // Backtrack if the current assignment doesn't lead to a solution
        matrix[i][j] = 0;
        updatePossibilities(matrix, possibilities, i, j, num);
      }
    }
  }

  return null; // No solution found at this depth
}

function initializePossibilities(size) {
  const possibilities = Array.from({ length: size }, () =>
    Array.from(
      { length: size },
      () => new Set(Array.from({ length: size }, (_, index) => index + 1))
    )
  );

  return possibilities;
}

function iterativeDeepeningLatinSquare(size) {
  let maxDepth = 1;

  while (true) {
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));
    const possibilities = initializePossibilities(size);

    const solution = depthFirstSearch(matrix, possibilities, 0, maxDepth);

    if (solution) {
      return solution;
    }

    maxDepth++;
  }
}

const size = 4;
const latinSquare = iterativeDeepeningLatinSquare(size);
console.table(latinSquare);
