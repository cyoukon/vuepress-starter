using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace SignalRDemo.Hubs
{
    public class ChatHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            var connectionId = this.Context.ConnectionId;
            //Clients.AllExcept(connectionId).SendAsync("JoinOrLeft", $"{connectionId}已加入");
            Clients.Caller.SendAsync("JoinOrLeft", $"您已加入");
            Clients.Others.SendAsync("JoinOrLeft", $"{connectionId}已加入");
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = this.Context.ConnectionId;
            Clients.AllExcept(connectionId).SendAsync("JoinOrLeft", $"{connectionId}已离开");
            return base.OnDisconnectedAsync(exception);
        }

        [HubMethodName(nameof(SendMessage))] // 可选attribute，用于自定义hub方法名
        public Task SendMessage(string user, string message)
        {
            return Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
