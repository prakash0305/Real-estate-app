using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PropertyCatalogueService.Data;
using PropertyCatalogueService.Models;

namespace PropertyCatalogueService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add MongoDB context and repository
            builder.Services.AddSingleton<PropertyContext>(); // Registering the MongoDB context
            builder.Services.AddScoped<IPropertyRepository, PropertyRepository>(); // Registering the repository

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

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(); // Ensure CORS policy is applied

            app.UseAuthorization(); // Ensure authorization middleware is in place

            app.UseStaticFiles(); // To serve static files

            app.MapControllers(); // Map controller routes

            app.Run(); // Start the application
        }
    }
}
