def is_valid(board, row, col, blocked_cells):
    for prev_row in range(row):
        if board[prev_row] == col or board[prev_row] - prev_row == col - row or board[prev_row] + prev_row == col + row:
            return False

    if (row, col) in blocked_cells:
        return False
    return True

def blocked_queens(board, blocked_cells):
    n = len(board)
    return any((board[row], col) in blocked_cells for row, col in enumerate(board))

def bidirectional_search(board1, row1, board2, row2, n, blocked_cells):
    if row1 == n:
        print_bidirectional_solution(board1, board2, n)
        return

    for col1 in range(n):
        if is_valid(board1, row1, col1, blocked_cells):
            board1[row1] = col1
            for col2 in range(n):
                if is_valid(board2, row2, col2, blocked_cells):
                    board2[row2] = col2
                    if board1[row1] == board2[row2] and row1 == row2:
                        bidirectional_search(board1, row1 + 1, board2, row2 + 1, n, blocked_cells)
            board1[row1] = -1

def print_bidirectional_solution(board1, board2, n):
    for i in range(n):
        line1 = ['Q' if j == board1[i] else '.' for j in range(n)]
        line2 = ['Q' if j == board2[i] else '.' for j in range(n)]

        print(' '.join(line1), '    ', ' '.join(line2))
    print()

def solve_nqueens_bidirectional(n, blocked_cells):
    board1 = [-1] * n
    board2 = [-1] * n
    bidirectional_search(board1, 0, board2, 0, n, blocked_cells)

blocked_cells = {(1, 1), (2, 3)}
#blocked_cells = set()
solve_nqueens_bidirectional(4, blocked_cells)