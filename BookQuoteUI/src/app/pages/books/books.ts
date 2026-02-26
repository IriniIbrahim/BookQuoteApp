import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { BooksService, Book } from '../../shared/services/books.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './books.html',
})
export class Books implements OnInit {
  books: Book[] = [];
  bookForm!: FormGroup;

  showModal = false;
  isEditMode = false;
  editingBookId: number | null = null;

  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });
  }

  loadBooks(): void {
    this.isLoading = true;
    this.booksService.getAll().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load books';
        this.isLoading = false;
      },
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.editingBookId = null;
    this.bookForm.reset();
    this.showModal = true;
  }

  openEditModal(book: Book): void {
    this.isEditMode = true;
    this.editingBookId = book.id;
    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      publicationDate: this.formatDateForInput(book.publicationDate),
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetModalState();
  }

  resetModalState(): void {
    this.isEditMode = false;
    this.editingBookId = null;
    this.bookForm.reset();
  }

  private formatDateForInput(date: string | Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const { title, author, publicationDate } = this.bookForm.value;

    if (this.isEditMode && this.editingBookId !== null) {
      const updatedBook: Book = {
        id: this.editingBookId,
        title,
        author,
        publicationDate,
        isArchived: false,
      };
      this.booksService.update(this.editingBookId, updatedBook).subscribe({
        next: () => {
          this.loadBooks();
          this.closeModal();
        },
        error: () => (this.errorMessage = 'Failed to update book'),
      });
    } else {
      const newBook: Omit<Book, 'id'> = { title, author, publicationDate };
      this.booksService.add(newBook).subscribe({
        next: () => {
          this.loadBooks();
          this.closeModal();
        },
        error: () => (this.errorMessage = 'Failed to add book'),
      });
    }
  }

  archiveBook(id: number): void {
    this.booksService.delete(id).subscribe({
      next: () => this.loadBooks(),
      error: () => (this.errorMessage = 'Failed to archive book'),
    });
  }

  get activeBooks(): Book[] {
    return this.books.filter((b) => !b.isArchived);
  }
}
