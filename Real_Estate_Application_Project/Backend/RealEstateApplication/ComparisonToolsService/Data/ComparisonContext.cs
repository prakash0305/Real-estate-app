using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using ComparisonService.Models;
using System;

namespace ComparisonService.Data
{
    public class ComparisonContext
    {
        private readonly IMongoDatabase _database;

        public ComparisonContext(IConfiguration configuration)
        {
            var connectionString = configuration["MongoDbSettings:ConnectionString"];
            var databaseName = configuration["MongoDbSettings:DatabaseName"];

            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentNullException(nameof(connectionString), "Connection string is not configured.");

            if (string.IsNullOrEmpty(databaseName))
                throw new ArgumentNullException(nameof(databaseName), "Database name is not configured.");

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<Comparison> Properties => _database.GetCollection<Comparison>("properties");
    }
}
