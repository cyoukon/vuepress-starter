using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using SocketLib;

namespace SocketApp.SocketHandlers
{
    public class ChatSocketHandler : SocketHandler
    {
        public ChatSocketHandler(ISocketFactory socketFactory) : base(socketFactory)
        {
        }

        public override async Task OnConnected(string key, WebSocket socket)
        {
            await base.OnConnected(key, socket);

            var keys = await socketFactory.GetAllKeyAsync();
            var tasks = new List<Task>();
            foreach (var item in keys)
            {
                if (item != key)
                {
                    tasks.Add(SendAsync(item, $"{key}进入了聊天"));
                }
            }
            await Task.WhenAll(tasks);
        }

        public override async Task OnDisconnected(string key)
        {
            await base.OnDisconnected(key);

            var keys = await socketFactory.GetAllKeyAsync();
            var tasks = new List<Task>();
            foreach (var item in keys)
            {
                if (item != key)
                {
                    tasks.Add(SendAsync(item, $"{key}离开了聊天"));
                }
            }
            await Task.WhenAll(tasks);
        }

        public override async Task ReceiveAsync(string key, WebSocketReceiveResult result, byte[] buffer)
        {
            var keys = await socketFactory.GetAllKeyAsync();
            var tasks = new List<Task>();
            foreach (var item in keys)
            {
                tasks.Add(SendAsync(item, $"{key}: {Encoding.UTF8.GetString(buffer, 0, result.Count)}"));
            }
            await Task.WhenAll(tasks);
        }
    }
}
