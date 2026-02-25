public class ArchiveLog
{
    public int Id { get; set; }

    public string EntityType { get; set; } = null!; 

    public int EntityId { get; set; }

    public string EntityTitle { get; set; } = null!;

    public string Details { get; set; } = null!; // JSON snapshot

    public DateTime DeletedAt { get; set; } = DateTime.UtcNow;
}