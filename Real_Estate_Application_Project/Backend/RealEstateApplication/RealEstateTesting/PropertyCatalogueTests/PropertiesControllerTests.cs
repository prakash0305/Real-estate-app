using Moq;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using PropertyCatalogueService.Controllers;
using PropertyCatalogueService.Data;
using PropertyCatalogueService.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace PropertyCatalogueService.Tests
{
    public class PropertiesControllerTests
    {
        private Mock<IPropertyRepository> _mockRepo;
        private Mock<IConfiguration> _mockConfig;
        private PropertiesController _controller;

        [SetUp]
        public void Setup()
        {
            _mockRepo = new Mock<IPropertyRepository>();
            _mockConfig = new Mock<IConfiguration>();

            // Mock configuration values
            _mockConfig.Setup(config => config["FileStorageSettings:ImageFolderPath"]).Returns("wwwroot/images");

            // Mock the image folder path to exist
            if (!Directory.Exists("wwwroot/images"))
            {
                Directory.CreateDirectory("wwwroot/images");
            }

            _controller = new PropertiesController(_mockRepo.Object, _mockConfig.Object);
        }

        [TearDown]
        public void TearDown()
        {
            // Clean up test environment if necessary
            var imageFolderPath = "wwwroot/images";
            if (Directory.Exists(imageFolderPath))
            {
                Directory.Delete(imageFolderPath, true);
            }
        }

        

        [Test]
        public async Task GetAllProperties_ReturnsOkWithPropertiesList()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetAllPropertiesAsync())
                     .ReturnsAsync(GetTestProperties());

            // Act
            var result = await _controller.GetAllProperties();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var properties = okResult.Value as IEnumerable<Property>;
            Assert.IsNotNull(properties);
            Assert.AreEqual(2, properties.Count());
        }

        [Test]
        public async Task GetPropertyByTitle_ReturnsOkWithProperty()
        {
            // Arrange
            var title = "Test Property 1";
            _mockRepo.Setup(repo => repo.GetPropertyByTitleAsync(title))
                     .ReturnsAsync(new Property { Title = title });

            // Act
            var result = await _controller.GetPropertyByTitle(title);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var property = okResult.Value as Property;
            Assert.IsNotNull(property);
            Assert.AreEqual(title, property.Title);
        }

        [Test]
        public async Task GetPropertyByTitle_ReturnsNotFoundWhenPropertyDoesNotExist()
        {
            // Arrange
            var title = "NonExistentTitle";
            _mockRepo.Setup(repo => repo.GetPropertyByTitleAsync(title))
                     .ReturnsAsync((Property)null);

            // Act
            var result = await _controller.GetPropertyByTitle(title);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        [Test]
        public async Task CreateProperty_ReturnsCreatedAtAction()
        {
            // Arrange
            var newProperty = new Property { Title = "New Property", Price = 300000, Location = "Miami", Size = 1800, Image = "image.jpg" };

            _mockRepo.Setup(repo => repo.CreatePropertyAsync(It.IsAny<Property>()))
                     .Returns(Task.CompletedTask);

            // Create a dummy image file for testing
            var imagePath = Path.Combine("wwwroot/images", newProperty.Image);
            System.IO.File.WriteAllText(imagePath, "dummy content");

            // Act
            var result = await _controller.CreateProperty(newProperty);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result.Result);
            var createdAtActionResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            Assert.AreEqual("GetPropertyByTitle", createdAtActionResult.ActionName);
            Assert.AreEqual(newProperty.Title, createdAtActionResult.RouteValues["title"]);

            // Cleanup
            System.IO.File.Delete(imagePath);
        }

        [Test]
        public async Task UpdateProperty_ReturnsOkWhenUpdatedSuccessfully()
        {
            // Arrange
            var title = "ExistingProperty";
            var updatedProperty = new Property { Title = title, Price = 350000, Location = "New Location" };

            _mockRepo.Setup(repo => repo.GetPropertyByTitleAsync(title))
                     .ReturnsAsync(new Property { Title = title });

            _mockRepo.Setup(repo => repo.UpdatePropertyByTitleAsync(updatedProperty))
                     .ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateProperty(title, updatedProperty);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            Assert.AreEqual("Property details updated successfully.", okResult.Value);
        }

       

        [Test]
        public async Task DeleteProperty_ReturnsNoContentWhenDeleted()
        {
            // Arrange
            var title = "PropertyToDelete";
            _mockRepo.Setup(repo => repo.DeletePropertyByTitleAsync(title))
                     .ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteProperty(title);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public async Task DeleteProperty_ReturnsNotFoundWhenPropertyDoesNotExist()
        {
            // Arrange
            var title = "NonExistentProperty";
            _mockRepo.Setup(repo => repo.DeletePropertyByTitleAsync(title))
                     .ReturnsAsync(false);

            // Act
            var result = await _controller.DeleteProperty(title);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task GetPropertiesByStatus_ReturnsOkWithPropertiesList()
        {
            // Arrange
            var status = "Available";
            _mockRepo.Setup(repo => repo.GetPropertiesByStatusAsync(status))
                     .ReturnsAsync(GetTestProperties().Where(p => p.Status == status));

            // Act
            var result = await _controller.GetPropertiesByStatus(status);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var properties = okResult.Value as IEnumerable<Property>;
            Assert.IsNotNull(properties);
            Assert.AreEqual(1, properties.Count());
            Assert.AreEqual(status, properties.First().Status);
        }

        [Test]
        public async Task GetPropertiesBySize_ReturnsOkWithPropertiesList()
        {
            // Arrange
            var minSize = 1500;
            var maxSize = 2000;
            _mockRepo.Setup(repo => repo.GetPropertiesBySizeRangeAsync(minSize, maxSize))
                     .ReturnsAsync(GetTestProperties().Where(p => p.Size >= minSize && p.Size <= maxSize));

            // Act
            var result = await _controller.GetPropertiesBySize(minSize, maxSize);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var properties = okResult.Value as IEnumerable<Property>;
            Assert.IsNotNull(properties);
            Assert.AreEqual(2, properties.Count());
        }

        [Test]
        public async Task GetPropertiesByLocation_ReturnsOkWithPropertiesList()
        {
            // Arrange
            var location = "New York";
            _mockRepo.Setup(repo => repo.GetPropertiesByLocationAsync(location))
                     .ReturnsAsync(GetTestProperties().Where(p => p.Location == location));

            // Act
            var result = await _controller.GetPropertiesByLocation(location);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var properties = okResult.Value as IEnumerable<Property>;
            Assert.IsNotNull(properties);
            Assert.AreEqual(1, properties.Count());
            Assert.AreEqual(location, properties.First().Location);
        }

        private IEnumerable<Property> GetTestProperties()
        {
            return new List<Property>
            {
                new Property { Title = "Test Property 1", Price = 250000, Location = "New York", Size = 1500, Status = "Available" },
                new Property { Title = "Test Property 2", Price = 400000, Location = "Miami", Size = 2000, Status = "Sold" }
            };
        }
    }
}
