import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Trip {
  id: number;
  time: string;
  price: number;
  route: string;
  seats: string;
  duration: number; // minutes
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class FakeApiService {
  login(email: string, password: string): Observable<{ token: string }> {
    return of({ token: 'fake-token' }).pipe(delay(300));
  }

  searchTrips(
    _params: {
      from: string;
      to: string;
      travelDate: string;
      returnDate?: string;
      passengers: number;
    }
  ): Observable<Trip[]> {
    const trips: Trip[] = [
      {
        id: 1,
        time: '08 h 30',
        price: 18,
        route: 'Tunis → Sfax',
        seats: '6/8 seats',
        duration: 195,
        rating: 4.6,
      },
      {
        id: 2,
        time: '09 h 15',
        price: 19,
        route: 'Tunis → Sfax',
        seats: '5/8 seats',
        duration: 190,
        rating: 4.8,
      },
      {
        id: 3,
        time: '10 h 00',
        price: 20,
        route: 'Tunis → Sfax',
        seats: '4/8 seats',
        duration: 200,
        rating: 4.7,
      },
      {
        id: 4,
        time: '11 h 45',
        price: 18,
        route: 'Tunis → Sfax',
        seats: '7/8 seats',
        duration: 195,
        rating: 4.5,
      },
      {
        id: 5,
        time: '12 h 15',
        price: 17,
        route: 'Tunis → Sfax',
        seats: '8/8 seats',
        duration: 205,
        rating: 4.4,
      },
      {
        id: 6,
        time: '13 h 30',
        price: 18,
        route: 'Tunis → Sfax',
        seats: '6/8 seats',
        duration: 195,
        rating: 4.6,
      },
      {
        id: 7,
        time: '14 h 20',
        price: 21,
        route: 'Tunis → Sfax',
        seats: '2/8 seats',
        duration: 190,
        rating: 4.9,
      },
      {
        id: 8,
        time: '15 h 10',
        price: 19,
        route: 'Tunis → Sfax',
        seats: '8/8 seats',
        duration: 200,
        rating: 4.3,
      },
    ];
    return of(trips).pipe(delay(300));
  }
}
