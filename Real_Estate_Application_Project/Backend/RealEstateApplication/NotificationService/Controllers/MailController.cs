using Microsoft.AspNetCore.Mvc;
using Notification_Service.Models;
using Notification_Service.Services;

namespace Notification_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly ApiMailService _mailService;

        public MailController(ApiMailService service)
        {
            _mailService = service;
        }

        [HttpPost]
        public async Task<string> SendMail([FromBody] MailData mailData)
        {
            return await _mailService.sendMailAsync(mailData);
        }
    }
}
