import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Trip {
  time: string;
  price: number;
  route: string;
  seats: string;
}

@Injectable({ providedIn: 'root' })
export class FakeApiService {
  login(email: string, password: string): Observable<{ token: string }> {
    return of({ token: 'fake-token' }).pipe(delay(300));
  }

  searchTrips(params: { from: string; to: string; travelDate: string; passengers: number }): Observable<Trip[]> {
    const { from, to } = params;
    const trips: Trip[] = [
      { time: '08 h 30', price: 18, route: `${from} → ${to}`, seats: '6/8 seats' },
      { time: '10 h 00', price: 20, route: `${from} → ${to}`, seats: '4/8 seats' },
      { time: '12 h 15', price: 17, route: `${from} → ${to}`, seats: '8/8 seats' },
    ];
    return of(trips).pipe(delay(300));
  }
}
