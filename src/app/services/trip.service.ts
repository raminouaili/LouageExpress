import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, delay, map } from 'rxjs';

export interface Trip {
  id: string;
  time: string;          // ex. "08 h 30"
  price: number;         // ex. 18
  route: string;         // ex. "Tunis → Sfax"
  seats: string;         // ex. "6/8 seats"
  duration: number;      // duration in minutes
  rating: number;        // ex. 4.8
}

export interface SearchParams {
  fromPlaceId: string;
  toPlaceId: string;
  travelDate: string;
  returnDate?: string;
  passengers: number;
}

@Injectable({ providedIn: 'root' })
export class TripService {
  constructor(private http: HttpClient) {}

  /** Search for trips matching given params. Uses mocked data for now. */
  searchTrips(params: SearchParams): Observable<Trip[]> {
    if (!params.fromPlaceId || !params.toPlaceId) {
      return throwError(() => new Error('Invalid place ids'));
    }

    const trips: Trip[] = Array.from({ length: 8 }, (_, i) => {
      const hour = 8 + i;
      const price = 17 + Math.floor(Math.random() * 5);
      const free = 8 - Math.floor(Math.random() * 7);
      return {
        id: `${params.fromPlaceId}-${params.toPlaceId}-${i}`,
        time: `${hour.toString().padStart(2, '0')} h ${i % 2 ? '15' : '30'}`,
        price,
        route: `${this.placeName(params.fromPlaceId)} → ${this.placeName(params.toPlaceId)}`,
        seats: `${free}/8 seats`,
        duration: 60 + Math.floor(Math.random() * 180),
        rating: Number((3 + Math.random() * 2).toFixed(1)),
      };
    });

    return of(trips).pipe(delay(300));
    // Real example:
    // return this.http.get<Trip[]>(`${environment.apiUrl}/trips`, { params: { ...params } });
  }

  /** Retrieve a trip by id using the search mock. */
  getTripById(id: string): Observable<Trip | undefined> {
    const [from, to] = id.split('-');
    return this.searchTrips({
      fromPlaceId: from,
      toPlaceId: to,
      travelDate: new Date().toISOString().slice(0, 10),
      passengers: 1,
    }).pipe(map(list => list.find(t => t.id === id)));
  }

  /** Conversion ultra-simple d’un place_id vers un nom “lisible”. */
  private placeName(placeId: string): string {
    return placeId.slice(0, 6).toUpperCase();
  }
}
