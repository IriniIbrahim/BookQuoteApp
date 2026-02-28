using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BookQuoteApi.Data;
using BookQuoteApi.Models;
using System.Text.Json;

namespace BookQuoteApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
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
            .Where(q => !q.IsArchived)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Quote>> CreateQuote(Quote quote)
    {
        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        return Ok(quote);
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
        // prevent removing the first five seeded quotes
        if (id > 0 && id <= 5)
        {
            return Forbid("Seeded quotes cannot be deleted.");
        }

        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null) return NotFound();

        quote.IsArchived = true;

        _context.ArchiveLogs.Add(new ArchiveLog
        {
            EntityType = "Quote",
            EntityId = quote.Id,
            EntityTitle = quote.Text.Length > 50
                ? quote.Text[..50] + "..."
                : quote.Text,
            Details = JsonSerializer.Serialize(new
            {
                quote.Text,
                quote.BookId
            })
        });

        await _context.SaveChangesAsync();
        return NoContent();
    }
}