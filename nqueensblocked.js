function solveNQueens(n, blockedPositions = []) {
    // Initialize the board with 0s and blocked positions
    const board = Array.from({ length: n }, () => Array(n).fill(0));
    blockedPositions.forEach(([x, y]) => {
        if (x >= 0 && x < n && y >= 0 && y < n) {
            board[x][y] = -1;
        }
    });

    function isSafe(board, row, col) {
        if (board[row][col] === -1) return false; // Check for blocked position

        // Check for queens in the same column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 1) return false;
        }

        // Check left diagonal
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 1) return false;
        }

        // Check right diagonal
        for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 1) return false;
        }

        return true;
    }

    function placeQueens(board, row) {
        if (row === n) {
            printBoard(board);
            return true;
        }

        for (let i = 0; i < n; i++) {
            if (isSafe(board, row, i)) {
                board[row][i] = 1;
                if (placeQueens(board, row + 1)) return true;
                board[row][i] = 0;
            }
        }
        return false;
    }

    function printBoard(board) {
        board.forEach(row => {
            console.log(row.map(cell => cell === -1 ? 'X' : cell).join(' '));
        });
        console.log('-----');
    }

    placeQueens(board, 0);
}

// Example usage
solveNQueens(8, [[0, 0], [2, 3]]);