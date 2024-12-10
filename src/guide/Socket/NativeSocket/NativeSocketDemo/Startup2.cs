using System;
using System.Net;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using Microsoft.Extensions.Logging.Debug;

namespace NativeSocketDemo
{
    public class Startup2
    {
        public Startup2(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(builder =>
            {
                builder.AddConsole()
                    .AddDebug()
                    .AddFilter<ConsoleLoggerProvider>(category: null, level: LogLevel.Debug)
                    .AddFilter<DebugLoggerProvider>(category: null, level: LogLevel.Debug);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            WebSocketOptions webSocketOptions = new WebSocketOptions
            {
                KeepAliveInterval = TimeSpan.FromSeconds(120),
            };
            //webSocketOptions.AllowedOrigins.Add("https://client.com");
            //webSocketOptions.AllowedOrigins.Add("https://www.client.com");
            app.UseWebSockets(webSocketOptions);
            app.Use(async (context, next) =>
            {
                if (context.Request.Path == "/ws")
                {
                    if (context.WebSockets.IsWebSocketRequest)
                    {
                        // ʹ�� WebSocket ʱ�������롱�������ڼ䱣���м���ܵ����С�
                        // ������м���ܵ��������Է��ͻ���� WebSocket ��Ϣ������׳� WebSocket �쳣

                        // ���ʹ�ú�̨��������д�� WebSocket����ȷ�������м���ܵ����С�
                        // ͨ��ʹ�� TaskCompletionSource<TResult> ִ�д˲�����
                        // ���� TaskCompletionSource ����̨���񣬲���ͨ�� WebSocket ���ʱ������� TrySetResult��
                        // �������ڼ�� Task ִ�� await���������ʾ����ʾ��
                        using (WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync())
                        {
                            var socketFinishedTcs = new TaskCompletionSource<object>();

                            BackgroundSocketProcessor.AddSocket(webSocket, socketFinishedTcs);

                            await socketFinishedTcs.Task;
                        }
                    }
                    else
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    }
                }
                else
                {
                    await next();
                }

            });

            app.UseFileServer();
        }

        internal class BackgroundSocketProcessor
        {
            internal static async void AddSocket(WebSocket socket, TaskCompletionSource<object> socketFinishedTcs)
            {
                var buffer = new byte[1024 * 4];
                WebSocketReceiveResult result;
                do
                {
                    result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        var message = $"[{DateTime.Now:yyyy/MM/dd HH:mm:ss.ffff}]�յ��ı���Ϣ��";
                        buffer = System.Text.Encoding.UTF8.GetBytes(message);
                        await socket.SendAsync(new ArraySegment<byte>(buffer, 0, buffer.Length), WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    else if (result.MessageType == WebSocketMessageType.Binary)
                    {
                        var message = $"[{DateTime.Now:yyyy/MM/dd HH:mm:ss.ffff}]�յ��ֽ���Ϣ��";
                        buffer = System.Text.Encoding.UTF8.GetBytes(message);
                        await socket.SendAsync(new ArraySegment<byte>(buffer, 0, buffer.Length), WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    else
                    {
                        break;
                    }
                }
                while (!result.CloseStatus.HasValue);
                await socket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
                socketFinishedTcs.TrySetResult(1);
            }
        }
    }
}
