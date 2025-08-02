import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private api: FakeApiService) {
    this.route.queryParamMap.subscribe((params) => {
      const from = params.get('from') ?? '';
      const to = params.get('to') ?? '';
      const travelDate = params.get('travelDate') ?? '';
      const passengers = Number(params.get('passengers') ?? '1');
      this.api
        .searchTrips({ from, to, travelDate, passengers })
        .subscribe((res) => (this.results = res));
    });
  }
}
