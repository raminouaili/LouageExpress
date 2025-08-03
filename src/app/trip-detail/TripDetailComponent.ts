import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../services/trip.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TripDetailComponent {
  trip!: Trip;

  constructor(private route: ActivatedRoute, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.trip = (nav?.extras.state as any)?.trip;
    if (!this.trip) {
      this.trip = {
        id: '0',
        time: '08 h 30',
        price: 18,
        route: 'Tunis → Sfax',
        seats: '6/8 seats',
        duration: 195,
        rating: 4.8,
      };
    }
  }

  get departure() {
    return this.trip.time;
  }

  get arrival() {
    const dep = parseTime(this.trip.time);
    const arr = dep + this.trip.duration;
    const h = Math.floor(arr / 60)
      .toString()
      .padStart(2, '0');
    const m = (arr % 60).toString().padStart(2, '0');
    return `${h} h ${m}`;
  }

  get durationDisplay() {
    const h = Math.floor(this.trip.duration / 60);
    const m = this.trip.duration % 60;
    return `${h} h ${m}`;
  }

  get seatsLeft() {
    const match = this.trip.seats.match(/(\d)\/(\d+)/);
    if (match) {
      const used = Number(match[1]);
      const total = Number(match[2]);
      return total - used;
    }
    return 0;
  }

  get capacityPercent() {
    const match = this.trip.seats.match(/(\d)\/(\d+)/);
    if (match) {
      const used = Number(match[1]);
      const total = Number(match[2]);
      return ((total - used) / total) * 100;
    }
    return 0;
  }
}

function parseTime(t: string): number {
  const parts = t.split(' ');
  const [hour, min] = parts[0].split('h').map((p) => p.trim());
  return Number(hour) * 60 + Number(min);
}
