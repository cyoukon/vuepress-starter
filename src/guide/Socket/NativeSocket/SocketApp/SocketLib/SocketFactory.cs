using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace SocketLib
{
    /// <summary>
    /// 创建和管理Socket对象
    /// </summary>
    public interface ISocketFactory
    {
        /// <summary>
        /// 添加
        /// </summary>
        /// <returns></returns>
        Task<bool> AddAsync(string key, WebSocket socket);
        /// <summary>
        /// 获取所有key
        /// </summary>
        /// <returns></returns>
        Task<ICollection<string>> GetAllKeyAsync();
        /// <summary>
        /// 获取
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        Task<WebSocket> GetAsync(string key);
        /// <summary>
        /// 移除
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        Task<bool> RemoveAsync(string key);
    }

    internal class SocketFactory : ISocketFactory
    {
        private readonly IDictionary<string, WebSocket> socketMemoryCache = new ConcurrentDictionary<string, WebSocket>();
        private readonly ILogger<SocketFactory> logger;

        public SocketFactory(ILogger<SocketFactory> logger)
        {
            this.logger = logger ?? throw new NullReferenceException(nameof(ILogger<SocketFactory>));
        }

        public async Task<bool> AddAsync(string key, WebSocket socket)
        {
            if (socketMemoryCache.ContainsKey(key))
            {
                await RemoveAsync(key).ConfigureAwait(false);
            }
            socketMemoryCache.Add(key, socket);
            return true;
        }

        public async Task<bool> RemoveAsync(string key)
        {
            socketMemoryCache.Remove(key, out WebSocket socket);
            if (socket is not null && !socket.CloseStatus.HasValue)
            {
                // socket连接没有关闭的情况下，需要关闭socket
                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "socket connection closed", CancellationToken.None).ConfigureAwait(false);
            }
            return true;
        }

        public Task<WebSocket> GetAsync(string key)
        {
            socketMemoryCache.TryGetValue(key, out WebSocket socket);
            return Task.FromResult(socket);
        }

        public Task<ICollection<string>> GetAllKeyAsync()
        {
            var keys = socketMemoryCache.Keys;
            return Task.FromResult(keys);
        }
    }
}
