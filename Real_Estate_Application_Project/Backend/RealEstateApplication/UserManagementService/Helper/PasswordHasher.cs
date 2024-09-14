using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace UserManagementService.Helper
{
    public static class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            // Generate a salt
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Derive a hash
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return $"{Convert.ToBase64String(salt)}.{hashed}";
        }

        public static bool VerifyPassword(string password, string storedPassword)
        {
            var parts = storedPassword.Split('.');
            if (parts.Length != 2)
                throw new FormatException("Unexpected password format.");

            var salt = Convert.FromBase64String(parts[0]);
            var hash = parts[1];

            var expectedHash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hash == expectedHash;
        }
    }
}
