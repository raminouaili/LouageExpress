import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultsComponent {
  query = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') ?? '';
    });
  }

  dummyResults(): string[] {
    if (!this.query) {
      return [];
    }
    return ['Result 1', 'Result 2', 'Result 3'].map((r) => `${r} for "${this.query}"`);
  }
}
