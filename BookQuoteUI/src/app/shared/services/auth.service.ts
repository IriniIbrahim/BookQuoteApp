import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://bookquoteapp-production.up.railway.app/api/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}
  register(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, {
      username,
      password,
    });
  }
  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUsername(): string {
    const token = this.getToken();
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '';
    } catch {
      return '';
    }
  }
}
