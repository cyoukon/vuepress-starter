using System;
using System.Threading.Tasks;

namespace SignalRDemo.Client
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var consumer = new Consumer();
            await consumer.StartNotificationConnectionAsync();
            Console.WriteLine("输入名字：");
            var name = Console.ReadLine();
            while (true)
            {
                var message = Console.ReadLine();
                var result = await consumer.SendNotificationAsync<string>(name, message);
            }
        }
    }
}
