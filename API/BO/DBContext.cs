using Microsoft.EntityFrameworkCore;

namespace ContactAPI.BO
{
    public class DBContext:DbContext
    {
        public DBContext(DbContextOptions<DBContext> options): base(options) {
        
        }
        public DbSet<Contact> Contacts { get; set; } = null!;
    }
}
