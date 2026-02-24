import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Quote } from '../models/quote';

@Injectable({ providedIn: 'root' })
export class ArchiveService {
  private archivedItems: (Book | Quote)[] = [];

  add(item: Book | Quote) {
    item.archived = true;
    this.archivedItems.push(item);
  }

  getAll(): (Book | Quote)[] {
    return [...this.archivedItems];
  }

  getBooks(): Book[] {
    return this.archivedItems.filter(i => 'title' in i) as Book[];
  }

  getQuotes(): Quote[] {
    return this.archivedItems.filter(i => 'text' in i) as Quote[];
  }
}