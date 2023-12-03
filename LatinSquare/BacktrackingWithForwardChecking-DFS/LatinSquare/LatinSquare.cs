namespace LatinSquareProblem
{
    public class LatinSquare
    {
        public static void Main(string[] args)
        {
            Console.Write("Input n: ");
            int n = int.Parse(Console.ReadLine()!);

            Solve(n, true);
        }

        public static void Solve(int n, bool enableForwardChecking = false)
        {
            int[,] latinSquare = new int[n, n];

            if (SolveLatinSquare(latinSquare, n, enableForwardChecking))
            {
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine("\nLatin Square solution found:");
                PrintMatrix(latinSquare, n);
            }
            else
            {
                Console.WriteLine("No solution found for the Latin Square problem.");
            }
        }

        static bool SolveLatinSquare(int[,] latinSquare, int N, bool enableForwardChecking = false)
        {
            return SolveLS(latinSquare, 0, 0, N, enableForwardChecking);
        }

        static bool SolveLS(int[,] latinSquare, int row, int col, int N, bool enableForwardChecking = false)
        {
            PrintProgress(latinSquare, row, col, N);

            if (row == N)
                return true;

            HashSet<int> valuesToCheck = new HashSet<int>(Enumerable.Range(1, N));

            if (enableForwardChecking)
            {
                valuesToCheck = GetRemainingValues(latinSquare, row, col, N);
                string remainingValues = string.Join(", ", valuesToCheck);

                Console.ForegroundColor = ConsoleColor.White;
                Console.Write($"\nRemaining values: {remainingValues}");
            }

            foreach (int num in valuesToCheck)
            {
                //Check constraint for num
                if (IsAllowed(latinSquare, row, col, num, N))
                {
                    latinSquare[row, col] = num;

                    if (SolveLS(latinSquare, col + 1 == N ? row + 1 : row, (col + 1) % N, N, enableForwardChecking))
                        return true;

                    //Backtrack
                    latinSquare[row, col] = 0;
                }
            }

            return false;
        }

        static bool IsAllowed(int[,] latinSquare, int row, int col, int num, int N)
        {
            //Check if num is not already in the current row and column
            for (int i = 0; i < N; i++)
            {
                if (latinSquare[row, i] == num || latinSquare[i, col] == num)
                    return false;
            }

            return true;
        }

        static void PrintMatrix(int[,] latinSquare, int N)
        {
            Console.ForegroundColor = ConsoleColor.White;

            for (int i = 0; i < N; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    Console.Write(latinSquare[i, j] + " ");
                }
                Console.WriteLine();
            }
        }

        static HashSet<int> GetRemainingValues(int[,] latinSquare, int row, int col, int N)
        {
            HashSet<int> remainingValues = new HashSet<int>();

            //Generate remaining values ranging from 1 to N
            for (int num = 1; num <= N; num++)
            {
                remainingValues.Add(num);
            }

            //Remove values in the same row
            for (int i = 0; i < N; i++)
            {
                remainingValues.Remove(latinSquare[row, i]);
            }

            //Remove values in the same column
            for (int i = 0; i < N; i++)
            {
                remainingValues.Remove(latinSquare[i, col]);
            }

            return remainingValues;
        }

        static void PrintProgress(int[,] latinSquare, int row, int col, int N)
        {
            if ((row != 0 || col != 0))
            {
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine(row == N ? "\nBase case" : $"\nRow: {row}, Col: {col}");

                for (int i = 0; i < N; i++)
                {
                    for (int j = 0; j < N; j++)
                    {
                        ConsoleColor cellColor = ConsoleColor.Red;

                        if (latinSquare[i, j] != 0)
                        {
                            cellColor = ConsoleColor.Green;
                        }

                        if (j < N - 1 && i < N - 1 && latinSquare[i, j + 1] == 0
                            && (j == 0 ? latinSquare[i, j] != 0 : latinSquare[i, j - 1] != 0)
                            && (i == 0 ? latinSquare[i, j] != 0 : latinSquare[i - 1, j] != 0)
                            && latinSquare[i, j] != 0)
                        {
                            cellColor = ConsoleColor.Yellow;
                        }

                        if (i == N - 1 && latinSquare[i, j] != 0 && j < N - 1 && latinSquare[i, j + 1] == 0)
                        {
                            cellColor = ConsoleColor.Yellow;
                        }

                        Console.ForegroundColor = cellColor;

                        Console.Write(latinSquare[i, j] + " ");
                    }
                    Console.WriteLine("");
                }
            }
        }
    }
}