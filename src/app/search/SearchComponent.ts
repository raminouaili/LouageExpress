import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeApiService } from '../services/fake-api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchComponent {
  constructor(private router: Router, private api: FakeApiService) {}

  onSubmit(form: NgForm): void {
    const { from, to, travelDate, passengers } = form.value;
    this.api.searchTrips({ from, to, travelDate, passengers: Number(passengers) }).subscribe(() => {
      this.router.navigate(['/results'], {
        queryParams: { from, to, travelDate, passengers },
      });
    });
  }
}
