using BenchmarkDotNet.Attributes;
using LatinSquareProblem;

namespace LatinSquareBenchmarks
{
    public class Benchmarks
    {
        [Params(5)]
        public int N { get; set; }

        [Benchmark(Baseline = true)]
        public void LatinSquareNoForwardChecking()
        {
            LatinSquare.Solve(N, false);
        }

        [Benchmark]
        public void LatinSquareForwardChecking()
        {
            LatinSquare.Solve(N, true);
        }
    }
}
