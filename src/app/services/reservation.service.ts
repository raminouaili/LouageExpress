import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  /** Book a trip with a number of seats by calling backend API. */
  bookTrip(tripId: string, seats: number): Observable<{ confirmationId: string }> {
    if (!this.auth.isAuthenticated()) {
      return throwError(() => new Error('Not authenticated'));
    }
    return this.http.post<{ confirmationId: string }>(
      `${environment.apiUrl}/reservations`,
      { tripId, seats }
    );
  }
}
