function isSafe(board, row, col) {
    for (let i = 0; i < row; i++) {
        if (board[i] === col || Math.abs(board[i] - col) === Math.abs(i - row)) {
            return false;
        }
    }
    return true;
}

function solveNQueensUtil(board, row, N, depth) {
    if (row === N) {
        return true;
    }

    if (depth <= 0) {
        return false;
    }

    for (let i = 0; i < N; i++) {
        if (isSafe(board, row, i)) {
            board[row] = i;
            if (solveNQueensUtil(board, row + 1, N, depth - 1)) {
                return true;
            }
            board[row] = -1; // Backtrack
        }
    }

    return false;
}

function IDDFS(N) {
    let board = new Array(N).fill(-1);

    for (let depth = 1; depth <= N; depth++) {
        if (solveNQueensUtil(board, 0, N, depth)) {
            return board;
        }
    }

    return null;
}

function printSolution(board) {
    if (board) {
        board.forEach(col => {
            console.log(" - ".repeat(col) + "Q" + " ".repeat(board.length - col - 1));
        });
    } else {
        console.log("No solution found");
    }
}

const N = 6; // Change this to the number of queens
let solutionBoard = IDDFS(N);
printSolution(solutionBoard);
