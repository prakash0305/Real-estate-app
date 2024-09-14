using MongoDB.Driver;
using ComparisonService.Data;
using ComparisonService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using ComparisonService.Data;

namespace ComparisonMicroservice.Repositories
{
    public class ComparisonRepository : IComparisonRepository
    {
        private readonly ComparisonContext _context;

        public ComparisonRepository(ComparisonContext context)
        {
            _context = context;
        }

        // Implement the method for getting properties by titles
        public async Task<IEnumerable<Comparison>> GetPropertiesByTitlesAsync(IEnumerable<string> titles)
        {
            var filter = Builders<Comparison>.Filter.In(p => p.Title, titles);
            return await _context.Properties.Find(filter).ToListAsync();
        }

        // Implement the method for getting properties by search terms if required
        public async Task<IEnumerable<Comparison>> GetPropertiesBySearchTermsAsync(IEnumerable<string> searchTerms)
        {
            // Placeholder implementation, if required
            var filter = Builders<Comparison>.Filter.Or(
                searchTerms.Select(term => Builders<Comparison>.Filter.Regex(p => p.Title, term)).ToArray()
            );
            return await _context.Properties.Find(filter).ToListAsync();
        }
    }
}
