using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using UserManagementService.Models;

namespace UserManagementService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
