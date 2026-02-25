namespace BookQuoteApi.Models;

public class Book
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Author { get; set; } = null!;

    public DateTime PublicationDate { get; set; }

    public bool IsArchived { get; set; } = false;
}