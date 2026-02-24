export interface ArchiveLog {
  id: number;
  entityType: 'Book' | 'Quote';
  entityId: number;
  entityTitle: string;
  details: string; 
  deletedAt: string;
}
