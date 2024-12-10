using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using SocketLib;

namespace SocketApp.SocketHandlers
{
    public class TestSocketHandler : SocketHandler
    {
        public TestSocketHandler(ISocketFactory socketFactory) : base(socketFactory)
        {
        }

        public override async Task ReceiveAsync(string key, WebSocketReceiveResult result, byte[] buffer)
        {
            var keys = await socketFactory.GetAllKeyAsync();
            var tasks = new List<Task>();
            foreach (var item in keys)
            {
                tasks.Add(SendAsync(item, $"[{this.GetType().Name}]{key}: {Encoding.UTF8.GetString(buffer, 0, result.Count)}"));
            }
            await Task.WhenAll(tasks);
        }
    }
}
