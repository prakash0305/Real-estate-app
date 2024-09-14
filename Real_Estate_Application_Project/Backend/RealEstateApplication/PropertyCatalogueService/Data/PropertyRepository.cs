using MongoDB.Bson;
using MongoDB.Driver;
using PropertyCatalogueService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyCatalogueService.Data
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly PropertyContext _context;

        public PropertyRepository(PropertyContext context)
        {
            _context = context;
        }

        public async Task<int> GetAllPropertiesCountAsync()
        {
            return (int)await _context.Properties.CountDocumentsAsync(_ => true);
        }

        public async Task<IEnumerable<Property>> GetAllPropertiesAsync()
        {
            return await _context.Properties.Find(prop => true).ToListAsync();
        }

        public async Task<Property> GetPropertyByTitleAsync(string title)
        {
            return await _context.Properties.Find(prop => prop.Title == title).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Property>> GetPropertiesByStatusAsync(string status)
        {
            return await _context.Properties.Find(prop => prop.Status.ToLower() == status.ToLower()).ToListAsync();
        }

        public async Task<IEnumerable<Property>> GetPropertiesByPriceRangeAsync(decimal minPrice, decimal maxPrice)
        {
            return await _context.Properties.Find(prop => prop.Price >= minPrice && prop.Price <= maxPrice).ToListAsync();
        }

        public async Task<IEnumerable<Property>> GetPropertiesBySizeRangeAsync(int minSize, int maxSize)
        {
            return await _context.Properties.Find(prop => prop.Size >= minSize && prop.Size <= maxSize).ToListAsync();
        }

        public async Task<IEnumerable<Property>> GetPropertiesByLocationAsync(string location)
        {
            return await _context.Properties.Find(prop => prop.Location.ToLower() == location.ToLower()).ToListAsync();
        }

        public async Task CreatePropertyAsync(Property property)
        {
            if (property.PropId == ObjectId.Empty)
            {
                property.PropId = ObjectId.GenerateNewId();
            }
            await _context.Properties.InsertOneAsync(property);
        }

        public async Task<bool> UpdatePropertyByTitleAsync(Property property)
        {
            var result = await _context.Properties.ReplaceOneAsync(
                prop => prop.PropId == property.PropId,
                property
            );
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeletePropertyByTitleAsync(string title)
        {
            var result = await _context.Properties.DeleteOneAsync(prop => prop.Title == title);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}
