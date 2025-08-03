import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, delay } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  /** Book a trip with a number of seats. Mock implementation. */
  bookTrip(tripId: string, seats: number): Observable<{ confirmationId: string }> {
    if (!this.auth.isAuthenticated()) {
      return throwError(() => new Error('Not authenticated'));
    }
    if (seats < 1 || seats > 8) {
      return throwError(() => new Error('Invalid seats'));
    }

    const confirmationId = `${tripId}-${Date.now()}`;
    return of({ confirmationId }).pipe(delay(300));
    // Real example:
    // return this.http.post<{ confirmationId: string }>(`${environment.apiUrl}/reservations`, { tripId, seats });
  }
}
