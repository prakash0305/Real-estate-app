using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContactAgentMicroservice.Models
{
    public class ContactAgent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        public DateTime? ScheduleTiming { get; set; }

        [Required]
        [MaxLength(255)]
        [EmailAddress]
        public string AgentEmail { get; set; }

        public string Message { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
