using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookQuoteApi.Data;
using BookQuoteApi.Models;

namespace BookQuoteApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArchiveController : ControllerBase
{
    private readonly AppDbContext _context;

    public ArchiveController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ArchiveLog>>> GetArchive([FromQuery] string? type)
    {
        IQueryable<ArchiveLog> query = _context.ArchiveLogs;

        if (!string.IsNullOrEmpty(type))
        {
            type = type.ToLower();
            query = type.ToLower() switch
            {
                "books" => query.Where(x => x.EntityType == "Book"),
                "quotes" => query.Where(x => x.EntityType == "Quote"),
                _ => query
            };            
        }

        var result = await query
            .OrderByDescending(x => x.DeletedAt)
            .ToListAsync();

        return Ok(result);
    }
}