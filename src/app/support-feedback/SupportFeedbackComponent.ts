import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-support-feedback',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './support-feedback.component.html',
  styleUrls: ['./support-feedback.component.css']
})
export class SupportFeedbackComponent {
  rating = 0;

  setRating(star: number): void {
    this.rating = star;
  }
}
