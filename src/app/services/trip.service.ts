import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment';

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

  /** Search for trips matching given params. */
  searchTrips(params: SearchParams): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.apiUrl}/trips`, {
      params: { ...params } as any,
    });
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

}
