import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-feedback.component.html',
  styleUrls: ['./support-feedback.component.css']
})
export class SupportFeedbackComponent {
  rating = 0;

  setRating(star: number): void {
    this.rating = star;
  }
}
