using Microsoft.EntityFrameworkCore;
using ClinicSystem.API.Models;

namespace ClinicSystem.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
    }
}