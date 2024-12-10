using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SocketLib
{
    internal class SocketsMiddleware : SocketsMiddlewareBase
    {
        public SocketsMiddleware(RequestDelegate next, ISocketHandler handler) : base(next, handler)
        {
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                var socket = await context.WebSockets.AcceptWebSocketAsync();
                await EchoAsync(socket, context);
            }
            else
            {
                await next(context);
            }
        }
    }
}
