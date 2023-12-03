using BenchmarkDotNet.Running;

namespace LatinSquareBenchmarks
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BenchmarkRunner.Run<Benchmarks>();
        }
    }
}
