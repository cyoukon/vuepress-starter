using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MassiveDataQuery
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            var es = new EsHelper("localhost:9200");
            await es.CreateSeedDataAsync(10000000);
            for (int i = 0; i < 20; i++)
            {
                await RunAsync(es.Scroll一千SearchAsync, i);
                await RunAsync(es.Scroll一万SearchAsync, i);
                await RunAsync(es.SearchAfterAsync, i);
            }
        }

        public static async Task RunAsync(Func<Task<List<EsEntity>>> func, int i)
        {
            var stopwatch = new System.Diagnostics.Stopwatch();
            stopwatch.Start();
            var data = await func.Invoke();
            stopwatch.Stop();
            var count = data.Select(d => d.ID).Distinct().Count();
            Console.WriteLine($"{i}：执行{func.Method.Name}，{data.Count}条数据，耗时{stopwatch.ElapsedMilliseconds}ms  {count}");
        }
    }
}
