using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using PropertyCatalogueService.Models;

using System;

namespace PropertyCatalogueService.Data
{
    public class PropertyContext
    {
        private readonly IMongoDatabase _database;

        public PropertyContext(IConfiguration configuration)
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

        public IMongoCollection<Property> Properties => _database.GetCollection<Property>("properties");
    }
}
