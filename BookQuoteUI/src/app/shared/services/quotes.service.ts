import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './books.service';

export interface Quote {
  id: number;
  text: string;
  author: string;
  bookId: number;
} 
@Injectable({ providedIn: 'root' })
export class QuotesService {
  private apiUrl = 'https://bookquoteapp-production.up.railway.app/api/quotes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl);
  }

  add(quote: Omit<Quote, 'id'>): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl, quote);
  }

  update(id: number, quote: Quote): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, quote);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
