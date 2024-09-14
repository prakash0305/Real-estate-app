using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Notification_Service.Models;

namespace Notification_Service.Services
{
    public class ApiMailService : IApiMailService
    {
        private readonly MailSetting _mailSetting;
        private readonly HttpClient _httpClient;

        public ApiMailService(IOptions<MailSetting> options, IHttpClientFactory clientFactory)
        {
            _mailSetting = options.Value;
            _httpClient = clientFactory.CreateClient("MailTrapApiClient");
        }

        public async Task<string> sendMailAsync(MailData mailData)
        {
            try
            {
                var htmlBody = string.Format(mailData.Body);
                var apiMail = new
                {
                    From = new { Email = _mailSetting.FromEmail, Name = _mailSetting.FromName },
                    To = new[] { new { Email = mailData.ToEmail, Name = mailData.ToName } },
                    Subject = mailData.Subject,
                    Html = htmlBody,
                };

                var requestUri = "send";  // Ensure this is correct based on API documentation

                var httpResponse = await _httpClient.PostAsJsonAsync(requestUri, apiMail);

                if (!httpResponse.IsSuccessStatusCode)
                {
                    return $"Request error: {httpResponse.ReasonPhrase}";
                }

                var responseJson = await httpResponse.Content.ReadAsStringAsync();
                var response = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseJson);

                if (response != null && response.TryGetValue("success", out object? success) && success is bool boolSuccess && boolSuccess)
                {
                    return "Mail sent sucessfully";
                }

                return responseJson.ToString();
            }
            catch (HttpRequestException ex)
            {
                return $"Request error: {ex.Message}";
            }
            catch (Exception ex)
            {
                return $"An error occurred: {ex.Message}";
            }
        }
    }
}
