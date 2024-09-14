using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContactAgentMicroservice.Controllers;
using ContactAgentMicroservice.Data;
using ContactAgentMicroservice.Models;
using System.Threading.Tasks;

namespace ContactAgentMicroservice.Tests
{
    public class ContactAgentControllerTests
    {
        private ContactAgentContext _context;
        private ContactAgentController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ContactAgentContext>()
                .UseInMemoryDatabase(databaseName: "ContactAgentDatabase")
                .Options;

            _context = new ContactAgentContext(options);
            _controller = new ContactAgentController(_context);
        }

        // Test PostContactAgent
        [Test]
        public async Task PostContactAgent_ReturnsCreatedAtActionResult()
        {
            // Arrange
            var contactAgent = new ContactAgent
            {
                FullName = "John Doe",
                Email = "john.doe@example.com",
                PhoneNumber = "1234567890",
                AgentEmail = "agent@example.com",
                Message = "Interested in buying property."
            };

            // Act
            var result = await _controller.PostContactAgent(contactAgent);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result.Result);
            var createdAtActionResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            Assert.AreEqual(nameof(ContactAgentController.GetContactAgent), createdAtActionResult.ActionName);

            // Retrieve the contact agent from the context to verify it was saved
            var dbContactAgent = await _context.ContactAgents.FindAsync(contactAgent.Id);
            Assert.IsNotNull(dbContactAgent);
            Assert.AreEqual(contactAgent.FullName, dbContactAgent.FullName);
        }

        // Test GetContactAgent when it does not exist
        [Test]
        public async Task GetContactAgent_ReturnsNotFound_WhenContactAgentDoesNotExist()
        {
            // Act
            var result = await _controller.GetContactAgent(999); // ID that doesn't exist

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        // Additional Test: Verify empty database
        [Test]
        public async Task PostContactAgent_ShouldReturnCorrectId()
        {
            // Arrange
            var contactAgent = new ContactAgent
            {
                FullName = "Jane Doe",
                Email = "jane.doe@example.com",
                PhoneNumber = "0987654321",
                AgentEmail = "agent2@example.com",
                Message = "Inquiring about rental properties."
            };

            // Act
            var result = await _controller.PostContactAgent(contactAgent);
            var createdAtActionResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);

            // Retrieve the contact agent from the context
            var createdId = (int)createdAtActionResult.RouteValues["id"];
            var dbContactAgent = await _context.ContactAgents.FindAsync(createdId);

            // Assert
            Assert.IsNotNull(dbContactAgent);
            Assert.AreEqual(contactAgent.FullName, dbContactAgent.FullName);
        }

       
    }
}
