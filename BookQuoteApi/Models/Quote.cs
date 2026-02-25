public class Quote
{
    public int Id { get; set; }
    public string Text { get; set; } = null!;
    public string Author { get; set; } = null!;
    public int BookId { get; set; }
    public bool IsArchived { get; set; }
}