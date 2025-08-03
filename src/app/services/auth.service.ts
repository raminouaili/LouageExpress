import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';

  constructor(private http: HttpClient) {}

  /**
   * Mocked login implementation. Replace with real HTTP call when backend is ready.
   */
  login(email: string, password: string): Observable<{ token: string }> {
    const token = btoa(`${email}:${password}:${Date.now()}`);
    return of({ token }).pipe(
      tap(res => localStorage.setItem(this.tokenKey, res.token))
    );
    // Real example:
    // return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password })
    //   .pipe(tap(res => localStorage.setItem(this.tokenKey, res.token)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /** Placeholder for future signup call */
  register(email: string, password: string): Observable<void> {
    return of(void 0);
  }
}
