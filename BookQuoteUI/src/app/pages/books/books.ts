import { Component } from '@angular/core';
import { Book } from '../../shared/models/book';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.html',
  imports: [CommonModule, FormsModule],
})
export class Books {
  books: Book[] = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008 },
    { id: 2, title: 'Atomic Habits', author: 'James Clear', year: 2018 },
  ];
  deleteBook(id: number): void {
    this.books = this.books.filter((b) => b.id !== id);
  }
  newTitle = '';
  newAuthor = '';
  newYear!: number;

  addBook(): void {
    if (!this.newTitle || !this.newAuthor || !this.newYear) return;

    this.books.push({
      id: Date.now(),
      title: this.newTitle,
      author: this.newAuthor,
      year: this.newYear,
    });

    this.newTitle = '';
    this.newAuthor = '';
    this.newYear = 0;
  }
}
