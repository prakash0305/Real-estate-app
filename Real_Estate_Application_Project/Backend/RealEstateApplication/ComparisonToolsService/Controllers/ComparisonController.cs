using Microsoft.AspNetCore.Mvc;
using ComparisonService.Models;
using ComparisonMicroservice.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ComparisonMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComparisonController : ControllerBase
    {
        private readonly IComparisonRepository _comparisonRepository;

        public ComparisonController(IComparisonRepository comparisonRepository)
        {
            _comparisonRepository = comparisonRepository;
        }

        // Endpoint to compare properties by title only with at least two titles
        [HttpGet("compare-by-title")]
        public async Task<ActionResult<IEnumerable<Comparison>>> ComparePropertiesByTitle(
            [FromQuery] string? title1 = null,
            [FromQuery] string? title2 = null,
            [FromQuery] string? title3 = null)
        {
            // Collect non-null titles into a list
            var titles = new List<string>();
            if (!string.IsNullOrWhiteSpace(title1)) titles.Add(title1);
            if (!string.IsNullOrWhiteSpace(title2)) titles.Add(title2);
            if (!string.IsNullOrWhiteSpace(title3)) titles.Add(title3);

            // Ensure at least two titles are provided
            if (titles.Count < 2)
            {
                return BadRequest("At least two titles are required for comparison.");
            }

            var properties = await _comparisonRepository.GetPropertiesByTitlesAsync(titles);

            if (properties == null || !properties.Any())
            {
                return NotFound("No properties found for the given titles.");
            }

            return Ok(properties);
        }
    }
}
