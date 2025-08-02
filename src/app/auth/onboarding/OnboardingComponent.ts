import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';


interface Slide {
  title: string;
  svg: string;
}
 @Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnboardingComponent {

  faApple = faApple;
  faGoogle = faGoogle;
   slides: Slide[] = [
    {
      title: 'Book your seat\nin seconds',
      svg: `<svg viewBox="0 0 200 140">…</svg>`
    },
    {
      title: 'Real-time\ntracking & ETA',
      svg: `<svg viewBox="0 0 200 140">…</svg>`
    },
    {
      title: 'Safe, verified\ndrivers',
      svg: `<svg viewBox="0 0 200 140">…</svg>`
    }
  ];
}