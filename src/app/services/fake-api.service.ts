import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay, map } from 'rxjs';

/* ------------------------------------------------------------------ */
/* Typages                                                             */
/* ------------------------------------------------------------------ */
export interface Trip {
  id: number;
  time: string;
  price: number;
  route: string;
  seats: string;
  duration: number; // minutes
  rating: number;
}

export interface SearchParams {
  fromPlaceId: string;
  toPlaceId: string;
  travelDate: string;
  returnDate?: string;
  passengers: number;
}

@Injectable({ providedIn: 'root' })
export class FakeApiService {
  /* ----------------------------------------------------------------
     AUTHENTIFICATION
  ---------------------------------------------------------------- */
  login(email: string, password: string): Observable<{ token: string }> {
    /*  🔐 on accepte n’importe quel couple user/pass */
    const token = btoa(`${email}:${password}:${Date.now()}`);
    /*  On “enregistre” le token en localStorage pour l’exemple */
    localStorage.setItem('token', token);

    return of({ token }).pipe(delay(300));
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /* ----------------------------------------------------------------
     RECHERCHE DE TRAJETS
  ---------------------------------------------------------------- */
  searchTrips(params: SearchParams): Observable<Trip[]> {
    /*  Exemple d’implémentation : on génère 8 trajets aléatoires      */
    if (!params.fromPlaceId || !params.toPlaceId) {
      return throwError(() => new Error('Invalid place ids'));
    }


    const trips: Trip[] = Array.from({ length: 8 }, (_, i) => {
      const hour = 8 + i;   // 08 h, 09 h, …
      const price = 17 + Math.floor(Math.random() * 5);      // 17-21 TND
      const free = 8 - Math.floor(Math.random() * 7);        // 1-8 sièges libres
      return {
        id: `${params.fromPlaceId}-${params.toPlaceId}-${i}`,
        time: `${hour.toString().padStart(2, '0')} h ${i % 2 ? '15' : '30'}`,
        price,
        route: `${this.placeName(params.fromPlaceId)} → ${this.placeName(params.toPlaceId)}`,
        seats: `${free}/8 seats`,
      };
    });

    return of(trips).pipe(delay(300));
  }

  /* ----------------------------------------------------------------
     DÉTAIL D’UN TRAJET + RÉSERVATION
  ---------------------------------------------------------------- */
  getTripById(id: string): Observable<Trip | undefined> {
    /* Dans un vrai backend, on ferait un GET /trips/:id.
       Ici on le reconstitue à partir d’une recherche. */
    const [from, to] = id.split('-');
    return this.searchTrips({
      fromPlaceId: from,
      toPlaceId: to,
      travelDate: new Date().toISOString().slice(0, 10),
      passengers: 1,
    }).pipe(map(list => list.find(t => t.id === id)));
  }

  bookTrip(tripId: string, seats: number): Observable<{ confirmationId: string }> {
    /*  Vérif basique  */
    if (!this.isAuthenticated()) {
      return throwError(() => new Error('Not authenticated'));
    }
    if (seats < 1 || seats > 8) {
      return throwError(() => new Error('Invalid seats'));
    }

    const confirmationId = `${tripId}-${Date.now()}`;
    return of({ confirmationId }).pipe(delay(300));
  }

  /* ----------------------------------------------------------------
     UTILITAIRES PRIVÉS
  ---------------------------------------------------------------- */
  /** Conversion ultra-simple d’un place_id vers un nom “lisible”. */
  private placeName(placeId: string): string {
    /* Dans la réalité, on requêterait l’API Places Details.
       Ici on simplifie : on tronque l’ID. */
    return placeId.slice(0, 6).toUpperCase();
  }
}
