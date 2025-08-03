import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FakeApiService, Trip } from '../services/fake-api.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultsComponent {
  results: Trip[] = [];
  allResults: Trip[] = [];
  returnDate: string | null = null;
  sortType: string = '';
  priceFilter = false;
  earliestFilter = false;

  constructor(
    private route: ActivatedRoute,
    private api: FakeApiService,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const from = params.get('from') ?? '';
      const to = params.get('to') ?? '';
      const travelDate = params.get('travelDate') ?? '';
      const returnDate = params.get('returnDate');
      const passengers = Number(params.get('passengers') ?? '1');
      this.returnDate = returnDate;
      this.api
        .searchTrips({
          from,
          to,
          travelDate,
          returnDate: returnDate || undefined,
          passengers,
        })
        .subscribe((res) => {
          this.allResults = res;
          this.applyFilters();
        });
    });
  }

  changeSort(type: string) {
    this.sortType = type;
    this.applyFilters();
  }

  togglePriceFilter() {
    this.priceFilter = !this.priceFilter;
    this.applyFilters();
  }

  toggleEarliestFilter() {
    this.earliestFilter = !this.earliestFilter;
    this.applyFilters();
  }

  private parseTime(t: string): number {
    const parts = t.split(' ');
    const [hour, min] = parts[0].split('h').map((p) => p.trim());
    return Number(hour) * 60 + Number(min);
  }

  private applyFilters() {
    let data = [...this.allResults];
    if (this.priceFilter) {
      data = data.filter((d) => d.price <= 20);
    }
    if (this.earliestFilter) {
      data = data.sort((a, b) => this.parseTime(a.time) - this.parseTime(b.time));
    }
    if (this.sortType === 'cheapest') {
      data = data.sort((a, b) => a.price - b.price);
    } else if (this.sortType === 'fastest') {
      data = data.sort((a, b) => a.duration - b.duration);
    } else if (this.sortType === 'rating') {
      data = data.sort((a, b) => b.rating - a.rating);
    }
    this.results = data;
  }

  openTrip(trip: Trip) {
    this.router.navigate(['/trip', trip.id], { state: { trip } });
  }
}
