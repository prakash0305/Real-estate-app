using NUnit.Framework;
using UserManagementService.Helper;

namespace AllMicroservice_Tests.AuthMicroserviceTests
{
    [TestFixture]
    public class PasswordHasherTests
    {
        // 1. Test password hashing and verification
        [Test]
        public void HashPassword_And_VerifyPassword_Matches()
        {
            string password = "Password1!";
            string hashedPassword = PasswordHasher.HashPassword(password);

            bool isMatch = PasswordHasher.VerifyPassword(password, hashedPassword);

            Assert.IsTrue(isMatch);
        }

        // 2. Test password verification with incorrect password
        [Test]
        public void VerifyPassword_WithIncorrectPassword_ReturnsFalse()
        {
            string password = "Password1!";
            string wrongPassword = "WrongPassword";
            string hashedPassword = PasswordHasher.HashPassword(password);

            bool isMatch = PasswordHasher.VerifyPassword(wrongPassword, hashedPassword);

            Assert.IsFalse(isMatch);
        }

        // 3. Test password hashing with an empty password
        [Test]
        public void HashPassword_EmptyPassword_ReturnsHashedString()
        {
            string password = "";
            string hashedPassword = PasswordHasher.HashPassword(password);

            Assert.IsNotNull(hashedPassword);
        }

        // 4. Test password hashing and verification with special characters
        [Test]
        public void HashPassword_And_VerifyPassword_WithSpecialCharacters_Matches()
        {
            string password = "P@ssw0rd!#";
            string hashedPassword = PasswordHasher.HashPassword(password);

            bool isMatch = PasswordHasher.VerifyPassword(password, hashedPassword);

            Assert.IsTrue(isMatch);
        }

        

        // 6. Test password hashing with null password
        [Test]
        public void HashPassword_NullPassword_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => PasswordHasher.HashPassword(null));
        }
    }
}
