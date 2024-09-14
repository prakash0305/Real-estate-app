using PropertyCatalogueService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyCatalogueService.Data
{
    public interface IPropertyRepository
    {
        Task<int> GetAllPropertiesCountAsync();
        Task<IEnumerable<Property>> GetAllPropertiesAsync();
        Task<Property> GetPropertyByTitleAsync(string title);
        Task<IEnumerable<Property>> GetPropertiesByStatusAsync(string status);
        Task<IEnumerable<Property>> GetPropertiesByPriceRangeAsync(decimal minPrice, decimal maxPrice);
        Task<IEnumerable<Property>> GetPropertiesBySizeRangeAsync(int minSize, int maxSize);
        Task<IEnumerable<Property>> GetPropertiesByLocationAsync(string location);
        Task CreatePropertyAsync(Property property);
        Task<bool> UpdatePropertyByTitleAsync(Property property);
        Task<bool> DeletePropertyByTitleAsync(string title);
    }
}
