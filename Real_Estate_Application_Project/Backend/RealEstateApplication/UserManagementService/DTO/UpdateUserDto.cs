using System.ComponentModel.DataAnnotations;

namespace UserManagementService.DTO
{
    public class UpdateUserDto
    {
        public string UserName { get; set; }

        [Phone]
        public string PhoneNumber { get; set; } // New property
       // public string ProfileImageUrl { get; set; }
    }
}
