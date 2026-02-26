import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesService, Quote } from '../../shared/services/quotes.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-my-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-favorites.html',
  styleUrl: './my-favorites.scss',
})
export class MyFavorites implements OnInit {
  allQuotes: Quote[] = [];
  favoriteQuotes: Quote[] = [];
  maxFavorites = 5;
  userId: string = '';

  constructor(
    private quotesService: QuotesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUsername();
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quotesService.getAll().subscribe({
      next: (data) => {
        this.allQuotes = data;
        this.loadFavorites();
      },
      error: () => console.error('Failed to load quotes'),
    });
  }

  loadFavorites(): void {
    const key = `favoriteQuotes_${this.userId}`;
    const favorites = localStorage.getItem(key);
    if (favorites) {
      const ids = JSON.parse(favorites);
      this.favoriteQuotes = this.allQuotes.filter((q) => ids.includes(q.id));
    }
  }

  isFavorite(quoteId: number): boolean {
    return this.favoriteQuotes.some((q) => q.id === quoteId);
  }

  toggleFavorite(quote: Quote): void {
    if (this.isFavorite(quote.id!)) {
      this.favoriteQuotes = this.favoriteQuotes.filter((q) => q.id !== quote.id);
    } else {
      if (this.favoriteQuotes.length < this.maxFavorites) {
        this.favoriteQuotes.push(quote);
      } else {
        alert(`You can only select up to ${this.maxFavorites} favorite quotes`);
        return;
      }
    }
    this.saveFavorites();
  }

  saveFavorites(): void {
    const key = `favoriteQuotes_${this.userId}`;
    const ids = this.favoriteQuotes.map((q) => q.id);
    localStorage.setItem(key, JSON.stringify(ids));
  }

  removeFromFavorites(quoteId: number): void {
    this.favoriteQuotes = this.favoriteQuotes.filter((q) => q.id !== quoteId);
    this.saveFavorites();
  }
}
