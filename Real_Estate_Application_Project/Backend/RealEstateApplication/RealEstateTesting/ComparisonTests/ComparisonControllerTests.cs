using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ComparisonMicroservice.Controllers; // Namespace for ComparisonController
using ComparisonMicroservice.Repositories; // Namespace for IComparisonRepository
using ComparisonService.Models; // Namespace for Comparison

namespace ComparisonMicroservice.Tests
{
    [TestFixture]
    public class ComparisonControllerTests
    {
        private Mock<IComparisonRepository> _mockRepository;
        private ComparisonController _controller;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IComparisonRepository>();
            _controller = new ComparisonController(_mockRepository.Object);
        }

        [Test]
        public async Task ComparePropertiesByTitle_ShouldReturnBadRequest_WhenNoTitlesAreProvided()
        {
            // Act
            var result = await _controller.ComparePropertiesByTitle();

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(400, badRequestResult.StatusCode);
            Assert.AreEqual("At least two titles are required for comparison.", badRequestResult.Value);
        }

        [Test]
        public async Task ComparePropertiesByTitle_ShouldReturnBadRequest_WhenOneTitleIsNull()
        {
            // Act
            var result = await _controller.ComparePropertiesByTitle(title1: "Title1", title2: null);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(400, badRequestResult.StatusCode);
            Assert.AreEqual("At least two titles are required for comparison.", badRequestResult.Value);
        }

        [Test]
        public async Task ComparePropertiesByTitle_ShouldReturnOk_WhenAllPropertiesAreFound()
        {
            // Arrange
            var properties = new List<Comparison>
            {
                new Comparison { Title = "Title1", Price = 100000 },
                new Comparison { Title = "Title2", Price = 150000 }
            };

            _mockRepository.Setup(repo => repo.GetPropertiesByTitlesAsync(It.IsAny<IEnumerable<string>>()))
                .ReturnsAsync(properties);

            // Act
            var result = await _controller.ComparePropertiesByTitle(title1: "Title1", title2: "Title2");

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.AreEqual(200, okResult.StatusCode);
            Assert.AreEqual(properties, okResult.Value);
        }

        [Test]
        public async Task ComparePropertiesByTitle_ShouldHandleNullPropertiesFromRepository()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.GetPropertiesByTitlesAsync(It.IsAny<IEnumerable<string>>()))
                .ReturnsAsync((List<Comparison>)null);

            // Act
            var result = await _controller.ComparePropertiesByTitle(title1: "Title1", title2: "Title2");

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
            var notFoundResult = result.Result as NotFoundObjectResult;
            Assert.AreEqual(404, notFoundResult.StatusCode);
            Assert.AreEqual("No properties found for the given titles.", notFoundResult.Value);
        }

        // Additional test case
        [Test]
        public async Task ComparePropertiesByTitle_ShouldReturnBadRequest_WhenTitlesAreEmpty()
        {
            // Act
            var result = await _controller.ComparePropertiesByTitle(title1: "", title2: "");

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.AreEqual(400, badRequestResult.StatusCode);
            Assert.AreEqual("At least two titles are required for comparison.", badRequestResult.Value);
        }

        // Additional test case
        [Test]
        public async Task ComparePropertiesByTitle_ShouldReturnNotFound_WhenNoMatchingPropertiesFound()
        {
            // Arrange
            var properties = new List<Comparison>();

            _mockRepository.Setup(repo => repo.GetPropertiesByTitlesAsync(It.IsAny<IEnumerable<string>>()))
                .ReturnsAsync(properties);

            // Act
            var result = await _controller.ComparePropertiesByTitle(title1: "Title1", title2: "Title2");

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result.Result);
            var notFoundResult = result.Result as NotFoundObjectResult;
            Assert.AreEqual(404, notFoundResult.StatusCode);
            Assert.AreEqual("No properties found for the given titles.", notFoundResult.Value);
        }
    }
}
