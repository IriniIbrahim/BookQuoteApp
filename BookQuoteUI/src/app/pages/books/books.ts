import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book';
import { CommonModule,NgClass } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-books',
  templateUrl: './books.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class Books implements OnInit {
  books: Book[] = [
    {
      id: 1,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      publicationDate: new Date('2008-01-03'),
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      publicationDate: new Date('2018-01-01'),
    },
  ];

  bookForm!: FormGroup;
  editingBook: Book | null = null;
  showModal = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((b) => b.id !== id);
  }
  editBook(book: Book) {
    this.editingBook = book;

    const formattedDate = new Date(book.publicationDate).toISOString().split('T')[0];

    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      publicationDate: formattedDate,
    });

    this.showModal = true;
  }
  onSubmit() {
    if (this.bookForm.invalid) return;

    const { title, author, publicationDate } = this.bookForm.value;

    if (this.editingBook) {
      this.editingBook.title = title;
      this.editingBook.author = author;
      this.editingBook.publicationDate = publicationDate;
    } else {
      this.books.push({
        id: Date.now(),
        title,
        author,
        publicationDate,
      });
    }

    this.bookForm.reset();
    this.editingBook = null;
    this.showModal = false;
  }
}
