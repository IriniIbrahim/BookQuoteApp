export type ArchivedEntityType = 'BOOK' | 'QUOTE';

export interface ArchiveLog {
  id: number; // log id
  entityId: number; // original item id
  entityType: ArchivedEntityType;

  // snapshot data (what user sees)
  title: string;
  description?: string; // for quotes text
  author?: string;

  deletedAt: Date;
}
