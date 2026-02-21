export interface AuditLog {
  id: number;
  userId: string;
  entityType: string;
  entityTitle: string;
  action: string;
  deletedAt: Date;
  details: string;
}
