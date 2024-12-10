using Microsoft.AspNetCore.SignalR.Client;
using SignalRDemo.Client.Models;
using System;
using System.Threading.Tasks;

namespace SignalRDemo.Client
{
    public sealed class Consumer : IAsyncDisposable
    {
        private readonly string HostDomain =
           Environment.GetEnvironmentVariable("HOST_DOMAIN") ?? "http://localhost:5000";

        private HubConnection _hubConnection;
        private async Task OnNotificationReceivedAsync(string user, string message)
        {
            // Do something meaningful with the notification.
            Console.WriteLine($"[{DateTime.Now:yyyy/MM/dd HH:mm:ss.ffff}] {user}：{message}");
            await Task.CompletedTask;
        }

        public Consumer()
        {
            _hubConnection = new HubConnectionBuilder()
                .WithUrl(new Uri($"{HostDomain}/hub/chatHub"))
                .WithAutomaticReconnect()
                .Build();

            _hubConnection.On<string, string>("ReceiveMessage", OnNotificationReceivedAsync);
            _hubConnection.On<string>("JoinOrLeft", msg => Console.WriteLine(msg));
        }

        public Task StartNotificationConnectionAsync()
        {
            return _hubConnection.StartAsync();
        }

        public Task<T> SendNotificationAsync<T>(string name, string message)
        {
            return _hubConnection.InvokeAsync<T>("SendMessage", name, message);
        }

        public async ValueTask DisposeAsync()
        {
            if (_hubConnection is not null)
            {
                await _hubConnection.DisposeAsync();
                _hubConnection = null;
            }
        }
    }
}
