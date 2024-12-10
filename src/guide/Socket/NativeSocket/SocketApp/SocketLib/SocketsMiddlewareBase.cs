using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SocketLib
{
    internal class SocketsMiddlewareBase
    {
        protected readonly RequestDelegate next;
        protected readonly ISocketHandler handler;

        public SocketsMiddlewareBase(RequestDelegate next, ISocketHandler handler)
        {
            this.next = next ?? throw new ArgumentNullException(nameof(next));
            this.handler = handler ?? throw new ArgumentNullException(nameof(handler));
        }

        protected async Task EchoAsync(WebSocket socket, HttpContext context)
        {
            var key = context.Request.Query["key"];
            if (string.IsNullOrWhiteSpace(key))
            {
                context.Response.StatusCode = 400;
                return;
            }
            await handler.OnConnected(key, socket);

            // 接收消息的 buffer
            var buffer = new byte[1024 * 4];
            // 判断连接类型，并执行相应操作
            while (socket.State == WebSocketState.Open)
            {
                // 这句执行之后，buffer 就是接收到的消息体，可以根据需要进行转换。
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                switch (result.MessageType)
                {
                    case WebSocketMessageType.Text:
                        await handler.ReceiveAsync(key, result, buffer);
                        break;
                    case WebSocketMessageType.Close:
                        await handler.OnDisconnected(key);
                        break;
                    case WebSocketMessageType.Binary:
                        // todo
                        throw new NotImplementedException();
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }
    }
}