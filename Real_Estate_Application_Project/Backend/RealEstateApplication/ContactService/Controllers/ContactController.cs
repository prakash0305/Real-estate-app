using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ContactAgentMicroservice.Data;
using ContactAgentMicroservice.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactAgentMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactAgentController : ControllerBase
    {
        private readonly ContactAgentContext _context;

        public ContactAgentController(ContactAgentContext context)
        {
            _context = context;
        }
        [HttpGet("count")]
        public async Task<ActionResult<int>> GetUserInteractionCount()
        {
            // Assuming all records are user interactions
            var count = await _context.ContactAgents.CountAsync();
            return Ok(count);
        }

        [HttpPost]
        public async Task<ActionResult<ContactAgent>> PostContactAgent(ContactAgent contactAgent)
        {
            _context.ContactAgents.Add(contactAgent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContactAgent), new { id = contactAgent.Id }, contactAgent);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactAgent>> GetContactAgent(int id)
        {
            var contactAgent = await _context.ContactAgents.FindAsync(id);

            if (contactAgent == null)
            {
                return NotFound();
            }

            return contactAgent;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactAgent>>> GetAllContactAgents()
        {
            var contactAgents = await _context.ContactAgents.ToListAsync();
            return Ok(contactAgents);
        }

    }
}
