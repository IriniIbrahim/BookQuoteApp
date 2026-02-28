import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { QuotesService, Quote } from '../../shared/services/quotes.service';
import { BooksService, Book } from '../../shared/services/books.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quotes.html',
})
export class Quotes implements OnInit {
  quotes: Quote[] = [];
  books: Book[] = [];
  quoteForm!: FormGroup;

  showModal = false;
  isEditMode = false;
  editingQuoteId: number | null = null;

  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private quotesService: QuotesService,
    private booksService: BooksService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
    this.loadBooks();
    this.quoteForm = this.fb.group({
      text: ['', Validators.required],
      author: ['', Validators.required],
      bookId: ['', Validators.required],
    });
  }

  loadQuotes(): void {
    this.isLoading = true;
    this.quotesService.getAll().subscribe({
      next: (data) => {
        this.quotes = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load quotes';
        this.isLoading = false;
      },
    });
  }

  loadBooks(): void {
    this.booksService.getAll().subscribe({
      next: (data) => (this.books = data),
      error: () => (this.errorMessage = 'Failed to load books'),
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.editingQuoteId = null;
    this.quoteForm.reset();
    this.showModal = true;
  }

  openEditModal(quote: Quote): void {
    this.isEditMode = true;
    this.editingQuoteId = quote.id;
    this.quoteForm.patchValue({
      text: quote.text,
      author: quote.author,
      bookId: quote.bookId,
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetModalState();
  }

  resetModalState(): void {
    this.isEditMode = false;
    this.editingQuoteId = null;
    this.quoteForm.reset();
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) return;

    const { text, author, bookId } = this.quoteForm.value;

    if (this.isEditMode && this.editingQuoteId !== null) {
      const updatedQuote: Quote = {
        id: this.editingQuoteId,
        text,
        author,
        bookId: +bookId,
      };
      this.quotesService.update(this.editingQuoteId, updatedQuote).subscribe({
        next: () => {
          this.loadQuotes();
          this.closeModal();
        },
        error: () => (this.errorMessage = 'Failed to update quote'),
      });
    } else {
      const newQuote: Omit<Quote, 'id'> = { text, author, bookId: +bookId };
      this.quotesService.add(newQuote).subscribe({
        next: () => {
          this.loadQuotes();
          this.closeModal();
        },
        error: () => (this.errorMessage = 'Failed to add quote'),
      });
    }
  }

  deleteQuote(id: number): void {
    this.quotesService.delete(id).subscribe({
      next: () => this.loadQuotes(),
      error: () => (this.errorMessage = 'Failed to delete quote'),
    });
  }
  get activeBooks(): Book[] {
    return this.books.filter((book) => !book.isArchived);
  }
  getBookTitle(bookId: number): string {
    const book = this.books.find((b) => b.id === bookId);
    return book ? book.title : 'Unknown Book';
  }

  addToFavorites(quote: Quote): void {
    const userKey = this.authService.getUsername();
    const storageKey = `favoriteQuotes_${userKey}`;

    const stored = localStorage.getItem(storageKey);
    let ids: number[] = stored ? JSON.parse(stored) : [];

    // If already favorite → REMOVE
    if (ids.includes(quote.id!)) {
      ids = ids.filter((id) => id !== quote.id);
      localStorage.setItem(storageKey, JSON.stringify(ids));
      return;
    }

    // If not favorite → ADD (max 5)
    if (ids.length >= 5) {
      alert('You can only have up to 5 favorite quotes!');
      return;
    }

    ids.push(quote.id!);
    localStorage.setItem(storageKey, JSON.stringify(ids));
  }
  isFavorite(quote: Quote): boolean {
    const userKey = this.authService.getUsername();
    const stored = localStorage.getItem(`favoriteQuotes_${userKey}`);
    const ids: number[] = stored ? JSON.parse(stored) : [];
    return ids.includes(quote.id!);
  }

  // The first five quotes are seeded in the DbContext and should not be deletable
  isProtected(quote: Quote): boolean {
    return quote.id !== undefined && quote.id <= 5;
  }
}
