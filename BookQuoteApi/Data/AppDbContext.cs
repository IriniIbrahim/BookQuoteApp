using Microsoft.EntityFrameworkCore;
using BookQuoteApi.Models;

namespace BookQuoteApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) {}
    public DbSet<User> Users => Set<User>();
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Quote> Quotes => Set<Quote>();
    public DbSet<ArchiveLog> ArchiveLogs => Set<ArchiveLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<Quote>().HasData(
            new Quote { Id = 1, Text = "The only way to do great work is to love what you do.", Author = "Steve Jobs", BookId = 1, IsArchived = false },
            new Quote { Id = 2, Text = "Life is what happens when you're busy making other plans.", Author = "John Lennon", BookId = 1, IsArchived = false },
            new Quote { Id = 3, Text = "The future belongs to those who believe in the beauty of their dreams.", Author = "Eleanor Roosevelt", BookId = 1, IsArchived = false },
            new Quote { Id = 4, Text = "It is during our darkest moments that we must focus to see the light.", Author = "Aristotle", BookId = 1, IsArchived = false },
            new Quote { Id = 5, Text = "In the end, we will remember not the words of our enemies, but the silence of our friends.", Author = "Martin Luther King Jr.", BookId = 1, IsArchived = false }
        );
    }
}