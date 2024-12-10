using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SocketLib
{
    public interface ISocketHandler
    {
        Task OnConnected(string key, WebSocket socket);
        Task OnDisconnected(string key);
        Task ReceiveAsync(string key, WebSocketReceiveResult result, byte[] buffer);
        Task SendAsync(string key, string message, WebSocketMessageType messageType = WebSocketMessageType.Text, int retryCount = 3, int retryMillisecondsDelay = 1000, CancellationToken cancellationToken = default);
    }

    public abstract class SocketHandler : ISocketHandler
    {
        protected readonly ISocketFactory socketFactory;

        public SocketHandler(ISocketFactory socketFactory)
        {
            this.socketFactory = socketFactory;
        }

        /// <summary>
        /// 连接一个 socket
        /// </summary>
        /// <param name="socket"></param>
        /// <returns></returns>
        public virtual async Task OnConnected(string key, WebSocket socket)
        {
            await socketFactory.AddAsync(key, socket).ConfigureAwait(false);
        }

        /// <summary>
        /// 断开指定 socket
        /// </summary>
        /// <param name="socket"></param>
        /// <returns></returns>
        public virtual async Task OnDisconnected(string key)
        {
            await socketFactory.RemoveAsync(key).ConfigureAwait(false);
        }


        /// <summary>
        /// 发送消息
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task SendAsync(string key,
                                    string message,
                                    WebSocketMessageType messageType = WebSocketMessageType.Text,
                                    int retryCount = 3,
                                    int retryMillisecondsDelay = 1000,
                                    CancellationToken cancellationToken = default)
        {
            for (int i = 0; i < retryCount; i++)
            {
                var socket = await socketFactory.GetAsync(key).ConfigureAwait(false);
                if (socket.State != WebSocketState.Open)
                {
                    await Task.Delay(retryMillisecondsDelay, cancellationToken).ConfigureAwait(false);
                    continue;
                }
                var buffer = Encoding.UTF8.GetBytes(message);
                await socket.SendAsync(new ArraySegment<byte>(buffer, 0, buffer.Length), messageType, true, cancellationToken).ConfigureAwait(false);
                return;
            }
            throw new WebSocketException($"{key} 对应socket状态异常");
        }

        /// <summary>
        /// 服务端接收到消息要执行的处理
        /// </summary>
        /// <param name="key"></param>
        /// <param name="result"></param>
        /// <param name="buffer"></param>
        /// <returns></returns>
        public abstract Task ReceiveAsync(string key, WebSocketReceiveResult result, byte[] buffer);
    }
}
