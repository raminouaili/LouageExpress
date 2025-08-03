import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService, Trip } from '../services/trip.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultsComponent implements OnDestroy {
  results: Trip[] = [];
  returnDate: string | null = null;

  private sub!: Subscription;

  earliestFilter = false;
  priceFilter = false;

  constructor(
    private route: ActivatedRoute,
    private trips: TripService,
    private router: Router
  ) {
    /* Listen to query-string changes ---------------------------------- */
    this.sub = this.route.queryParamMap.subscribe(params => {
      /* NOTE
         SearchComponent envoie `from` et `to` qui contiennent les place_id
         (ou, à défaut, le nom de la ville).  TripService attend
         fromPlaceId / toPlaceId : on les mappe simplement.
      */
      const fromPlaceId = params.get('from') ?? '';
      const toPlaceId   = params.get('to') ?? '';
      const travelDate  = params.get('travelDate') ?? '';
      const returnDate  = params.get('returnDate');
      const passengers  = Number(params.get('passengers') ?? '1');

      this.returnDate = returnDate;

      this.trips
        .searchTrips({
          fromPlaceId,
          toPlaceId,
          travelDate,
          returnDate: returnDate || undefined,
          passengers
        })
        .subscribe(trips => (this.results = trips));
    });
  }

  openTrip(trip: Trip) {
    this.router.navigate(['/trip', trip.id], { state: { trip } });
  }

  toggleEarliestFilter() {
    this.earliestFilter = !this.earliestFilter;
  }

  togglePriceFilter() {
    this.priceFilter = !this.priceFilter;
  }

  /* Cleanup to avoid memory leak -------------------------------------- */
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
