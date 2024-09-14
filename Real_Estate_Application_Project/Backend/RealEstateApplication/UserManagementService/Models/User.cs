using System.ComponentModel.DataAnnotations;


namespace UserManagementService.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; } // Ensure this property exists

        public string PhoneNumber { get; set; } // optional

       // public string ProfileImageUrl { get; set; } // Ensure this is allowed to be null
    }

}

