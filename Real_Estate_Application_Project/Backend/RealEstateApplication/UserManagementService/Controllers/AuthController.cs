using Microsoft.AspNetCore.Mvc;
using UserManagementService.Data;
using UserManagementService.Models;
using UserManagementService.DTO;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserManagementService.Helper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace UserManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly string _jwtKey;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _jwtKey = configuration["Jwt:Key"];
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Authenticate([FromBody] LoginUserDto userObj)
        {
            if (userObj == null)
            {
                Console.WriteLine("User object is null");
                return BadRequest(new { Message = "User object is null" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userObj.Email);
            if (user == null)
            {
                Console.WriteLine($"User not found for email: {userObj.Email}");
                return NotFound(new { Message = "User Not Found" });
            }

            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
            {
                Console.WriteLine("Password is incorrect");
                return BadRequest(new { Message = "Password is incorrect" });
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Token = tokenString,
                Username = user.UserName,
                Role = user.Role
            });
        }

        //[Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }





        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto userDto)
        {
            if (userDto == null)
                return BadRequest(new { Message = "User object is null" });

            if (await CheckUserNameExistAsync(userDto.UserName))
                return BadRequest(new { Message = "User Name already exists" });

            if (await CheckEmailExistAsync(userDto.Email))
                return BadRequest(new { Message = "Email Id already exists" });

            if (userDto.Role != "Admin" && userDto.Role != "User")
                return BadRequest(new { Message = "Role must be either 'Admin' or 'User'" });

            var passStrengthMsg = CheckPasswordStrength(userDto.Password);
            if (!string.IsNullOrEmpty(passStrengthMsg))
                return BadRequest(new { Message = passStrengthMsg });

            var user = new User
            {
                UserName = userDto.UserName,
                Email = userDto.Email,
                Role = userDto.Role,
                Password = PasswordHasher.HashPassword(userDto.Password),
                PhoneNumber = userDto.PhoneNumber, // Optional
               // ProfileImageUrl = userDto.ProfileImageUrl // Optional
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User Registered" });
        }


        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateUser(string username, [FromBody] UpdateUserDto updateUserDto)
        {
            if (updateUserDto == null)
                return BadRequest(new { Message = "Request object is null" });

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            // Only update the fields that are provided in the DTO
            if (!string.IsNullOrEmpty(updateUserDto.UserName))
            {
                user.UserName = updateUserDto.UserName;
            }

            if (!string.IsNullOrEmpty(updateUserDto.PhoneNumber))
            {
                user.PhoneNumber = updateUserDto.PhoneNumber;
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User details updated successfully" });
        }




        private async Task<bool> CheckEmailExistAsync(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        private async Task<bool> CheckUserNameExistAsync(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == userName);
        }

        private string CheckPasswordStrength(string password)
        {
            if (password.Length < 8)
                return "Password must be at least 8 characters long";

            if (!Regex.IsMatch(password, @"[A-Z]"))
                return "Password must contain at least one uppercase letter";

            if (!Regex.IsMatch(password, @"[a-z]"))
                return "Password must contain at least one lowercase letter";

            if (!Regex.IsMatch(password, @"[0-9]"))
                return "Password must contain at least one number";

            if (!Regex.IsMatch(password, @"[\W_]"))
                return "Password must contain at least one special character";

            return null;
        }
    }
}
