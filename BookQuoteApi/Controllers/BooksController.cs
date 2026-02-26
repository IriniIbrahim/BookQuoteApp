using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookQuoteApi.Data;
using BookQuoteApi.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

namespace BookQuoteApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
        return await _context.Books
            .Where(b => !b.IsArchived)
            .ToListAsync();
    }
    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
            return NotFound();

        return book;
    }
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
    }
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, Book updatedBook)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null) return NotFound();

        book.Title = updatedBook.Title;
        book.Author = updatedBook.Author;
        book.PublicationDate = updatedBook.PublicationDate;

        await _context.SaveChangesAsync();
        return Ok(book);
    }
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> ArchiveBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
            return NotFound();

        book.IsArchived = true;

        var log = new ArchiveLog
        {
            EntityType = "Book",
            EntityId = book.Id,
            EntityTitle = book.Title,
            Details = JsonSerializer.Serialize(new
            {
                author = book.Author,
                publicationDate = book.PublicationDate
            })
        };

        _context.ArchiveLogs.Add(log);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}