using NUnit.Framework;
using Moq;
using UserManagementService.Controllers;
using UserManagementService.Data;
using UserManagementService.DTO;
using UserManagementService.Models;
using UserManagementService.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System;

namespace AllMicroservice_Tests.AuthMicroserviceTests
{
    [TestFixture]
    public class AuthControllerTests
    {
        private AuthController _controller;
        private ApplicationDbContext _context;
        private IConfiguration _mockConfig;

        [SetUp]
        public void Setup()
        {
            // Create an in-memory database with a unique name for each test run
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: $"AuthMicroServiceTestsDatabase_{Guid.NewGuid()}")
                .Options;

            _context = new ApplicationDbContext(options);

            // Seed the database with test data
            _context.Users.AddRange(new List<User>
            {
                new User
                {
                    UserName = "example",
                    Password = PasswordHasher.HashPassword("example@123"),
                    Email = "user@example.com",
                    Role = "User",
                    PhoneNumber = "1234567890"
                }
            });
            _context.SaveChanges();

            // Setup mock configuration
            _mockConfig = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string>
                {
                    { "Jwt:Key", "yT8kF3pLz9VbN6wQeR1jXaG5mPsH4oUv" }
                })
                .Build();

            _controller = new AuthController(_context, _mockConfig);
        }

        // 1. Test user registration with null user object
        [Test]
        public async Task RegisterUser_NullUserDto_ReturnsBadRequest()
        {
            var result = await _controller.RegisterUser(null);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        // 2. Test user registration with invalid role
        [Test]
        public async Task RegisterUser_InvalidRole_ReturnsBadRequest()
        {
            var userDto = new RegisterUserDto
            {
                UserName = "testuser",
                Email = "test@test.com",
                Password = "Password1!",
                Role = "InvalidRole",
                PhoneNumber = "9876543244"
            };
            var result = await _controller.RegisterUser(userDto);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        // 3. Test user login with invalid credentials
        [Test]
        public async Task Login_InvalidCredentials_ReturnsNotFound()
        {
            var loginDto = new LoginUserDto { Email = "invalid@test.com", Password = "WrongPassword" };
            var result = await _controller.Authenticate(loginDto);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        // 4. Test user login with correct credentials
        [Test]
        public async Task Login_ValidCredentials_ReturnsOkResult()
        {
            var loginDto = new LoginUserDto { Email = "valid@test.com", Password = "Password1!" };

            // Add a user with PhoneNumber to avoid the exception
            var user = new User
            {
                Email = "valid@test.com",
                Password = PasswordHasher.HashPassword("Password1!"),
                UserName = "testuser",
                Role = "User",
                PhoneNumber = "1234567890" // Ensure PhoneNumber is provided
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var result = await _controller.Authenticate(loginDto);

            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        // 5. Test getting a user by username when user exists
        [Test]
        public async Task GetUser_UserExists_ReturnsOkResult()
        {
            var result = await _controller.GetUser("example");

            var actionResult = result as ActionResult<User>;
            Assert.IsNotNull(actionResult);
            Assert.IsInstanceOf<OkObjectResult>(actionResult.Result);
        }

        // 6. Test updating a user with valid data
        [Test]
        public async Task UpdateUser_ValidData_ReturnsOkResult()
        {
            var updateDto = new UpdateUserDto { UserName = "prakash", PhoneNumber = "7993975200" };

            var result = await _controller.UpdateUser("example", updateDto);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

       
        
       

        // 9. Test user update with non-existent user
        [Test]
        public async Task UpdateUser_NonExistentUser_ReturnsNotFound()
        {
            var updateDto = new UpdateUserDto { UserName = "nonexistent", PhoneNumber = "0000000000" };

            var result = await _controller.UpdateUser("nonexistent", updateDto);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        // 10. Test user registration with missing required fields
        [Test]
        public async Task RegisterUser_MissingRequiredFields_ReturnsBadRequest()
        {
            var incompleteUserDto = new RegisterUserDto
            {
                UserName = "incompleteuser",
                // Email, Password, Role, and PhoneNumber are missing
            };

            var result = await _controller.RegisterUser(incompleteUserDto);
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }
    }
}
