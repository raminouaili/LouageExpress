import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchComponent {
  query = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.query.trim()) {
      this.router.navigate(['/results'], { queryParams: { q: this.query } });
    }
  }
}
