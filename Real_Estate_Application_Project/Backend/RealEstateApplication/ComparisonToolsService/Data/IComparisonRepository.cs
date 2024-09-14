using ComparisonService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ComparisonMicroservice.Repositories
{
    public interface IComparisonRepository
    {
        Task<IEnumerable<Comparison>> GetPropertiesByTitlesAsync(IEnumerable<string> titles);
        // Ensure this method exists if you're using it
        Task<IEnumerable<Comparison>> GetPropertiesBySearchTermsAsync(IEnumerable<string> searchTerms);
    }
}
