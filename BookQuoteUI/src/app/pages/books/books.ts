import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Book } from '../../shared/models/book';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './books.html',
})
export class Books implements OnInit {
  books: Book[] = [
    {
      id: 1,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      publicationDate: new Date('2008-01-03'),
      archived: false,
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      publicationDate: new Date('2018-01-01'),
      archived: false,
    },
  ];

  bookForm!: FormGroup;

  showModal = false;
  isEditMode = false;
  editingBookId: number | null = null;

  constructor(private fb: FormBuilder) {}
  resetModalState(): void {
    this.isEditMode = false;
    this.editingBookId = null;
    this.bookForm.reset();
  }
  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });
  }

  private formatDateForInput(date: string | Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.editingBookId = null;
    this.bookForm.reset({
      title: '',
      author: '',
      publicationDate: '',
    });
    this.showModal = true; // open modal last
  }

  openEditModal(book: Book): void {
    this.isEditMode = true;
    this.editingBookId = book.id;
    this.bookForm.reset(); // clean previous form
    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      publicationDate: this.formatDateForInput(book.publicationDate),
    });
    this.showModal = true; // open modal last
  }

  closeModal(): void {
    this.showModal = false;
    // this.isEditMode = false;
    // this.editingBookId = null;
    // this.bookForm.reset();
    this.resetModalState();
  }

  // deleteBook(id: number): void {
  //   this.books = this.books.filter((b) => b.id !== id);
  // }
  archiveBook(id: number): void {
    const book = this.books.find((b) => b.id === id);
    if (book) {
      book.archived = true;
    }
  }
  get activeBooks(): Book[] {
    return this.books.filter((book) => !book.archived);
  }
  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const { title, author, publicationDate } = this.bookForm.value;

    if (this.isEditMode && this.editingBookId !== null) {
      const index = this.books.findIndex((b) => b.id === this.editingBookId);

      if (index !== -1) {
        this.books[index] = {
          ...this.books[index],
          title,
          author,
          publicationDate,
        };
      }
    } else {
      this.books.push({
        id: Date.now(),
        title,
        author,
        publicationDate,
      });
    }

    this.closeModal();
  }
}
