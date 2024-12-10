using System;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SocketLib
{
    internal class SocketsWithAuthMiddleware : SocketsMiddlewareBase
    {
        private readonly Func<string, Task<bool>> authorizationAsync;

        public SocketsWithAuthMiddleware(RequestDelegate next, ISocketHandler handler, Func<string, Task<bool>> authorizationAsync)
            : base(next, handler)
        {
            this.authorizationAsync = authorizationAsync ?? throw new ArgumentNullException(nameof(authorizationAsync));
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                if (!context.WebSockets.WebSocketRequestedProtocols.Any())
                {
                    context.Response.StatusCode = 401;
                    return;
                }
                var token = context.WebSockets.WebSocketRequestedProtocols.First();
                if (!await authorizationAsync.Invoke(token))
                {
                    context.Response.StatusCode = 401;
                    return;
                }

                var socket = await context.WebSockets.AcceptWebSocketAsync(token);
                await EchoAsync(socket, context);
            }
            else
            {
                await next(context);
            }
        }
    }
}
