using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ComparisonService.Data;
using ComparisonMicroservice.Repositories;
using ComparisonService.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure MongoDB
builder.Services.Configure<ComparisonContext>(builder.Configuration);
builder.Services.AddSingleton<ComparisonContext>();
builder.Services.AddScoped<IComparisonRepository, ComparisonRepository>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();
