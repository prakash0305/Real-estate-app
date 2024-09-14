
//mailsetting
namespace Notification_Service.Models
{
    public class MailSetting
    {
        public string Host { get; set; }
        public string Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FromEmail { get; set; }
        public string FromName { get; set; }
        public string ApiToken { get; set; }
        public string ApiBaseUrl { get; set; }
    }
}
