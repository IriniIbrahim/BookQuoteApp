export interface Quote {
  id?: number;
  text: string;
  author: string;
  bookId: number;
  archived?: boolean;
}
