using System;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace SocketLib
{
    public static class WebSocketExtensions
    {
        public static IServiceCollection AddWebSocket(this IServiceCollection services)
        {
            // ISocketFactory 只在 SocketHandler 的基类中注入，
            // 每个 SocketHandler 管理一组类型相同的 Socket，
            // 这里SocketHandler采用单例模式，不同的SocketHandler注入不同的SocketFactory实例，
            // 用于隔离Socket组
            services.AddTransient<ISocketFactory, SocketFactory>();

            var exportedTypes = Assembly.GetEntryAssembly()?.ExportedTypes;
            if (exportedTypes == null) return services;

            foreach (var type in exportedTypes)
            {
                if (type.GetTypeInfo().BaseType == typeof(SocketHandler))
                {
                    services.AddSingleton(type);
                }
            }

            return services;
        }

        public static IApplicationBuilder MapWebSockets<T>(
            this IApplicationBuilder app, PathString path, Func<string, Task<bool>> authorizationAsync = null) where T : SocketHandler
        {
            var socket = app.ApplicationServices.GetRequiredService<T>();
            return authorizationAsync is null
                ? app.Map(path, x => x.UseMiddleware<SocketsMiddleware>(socket))
                : app.Map(path, x => x.UseMiddleware<SocketsWithAuthMiddleware>(socket, authorizationAsync));
        }
    }
}
