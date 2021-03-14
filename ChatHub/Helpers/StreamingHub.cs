using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatHub.Helpers
{
    public class StreamingHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", Context.User.Identity.Name, message);
        }
    }
}
