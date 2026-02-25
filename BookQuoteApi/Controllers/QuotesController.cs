using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookQuoteApi.Data;
using BookQuoteApi.Models;
using System.Text.Json;

namespace BookQuoteApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public QuotesController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
    {
        return await _context.Quotes
            .Where(b => !b.IsArchived)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Quote>> CreateQuote(Quote quote)
    {
        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetQuotes), new { id = quote.Id }, quote);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(int id, Quote updatedQuote)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null) return NotFound();

        quote.Text = updatedQuote.Text;
        quote.Author = updatedQuote.Author;
        quote.BookId = updatedQuote.BookId;

        await _context.SaveChangesAsync();
        return Ok(quote);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> ArchiveQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null)
            return NotFound();

        quote.IsArchived = true;

        var log = new ArchiveLog
        {
            EntityType = "Quote",
            EntityId = quote.Id,
            EntityTitle = quote.Text.Length > 50
                ? quote.Text.Substring(0, 50) + "..."
                : quote.Text,
            Details = JsonSerializer.Serialize(new
            {
                quote.Text,
                quote.BookId,
                quote.Author
            })
        };

        _context.ArchiveLogs.Add(log);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}