
using Notification_Service.Models;

namespace Notification_Service.Services
{
    public interface IApiMailService
    {
        Task<string> sendMailAsync(MailData mailData);
    }
}
