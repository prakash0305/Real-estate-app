using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Notification_Service.Models;
using Notification_Service.Services;

namespace Notification_Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container
            builder.Services.AddControllers();

            // Configure Swagger/OpenAPI
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure MailSettings
            builder.Services.Configure<MailSetting>(builder.Configuration.GetSection("MailSetting"));

            // Register ApiMailService as a transient service
            builder.Services.AddTransient<ApiMailService>();

            // Configure HttpClient with Authorization header
            builder.Services.AddHttpClient("MailTrapApiClient", (services, client) =>
            {
                var mailSetting = services.GetRequiredService<IOptions<MailSetting>>().Value;
                client.BaseAddress = new Uri(mailSetting.ApiBaseUrl);
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", mailSetting.ApiToken);
            });

            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors();
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
