import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';


interface Slide {
  title: string;
  imageName: string;
}
 @Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['../auth-shared.css', './onboarding.component.css'],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnboardingComponent {

  faApple = faApple;
  faGoogle = faGoogle;
   slides: Slide[] = [
    {
      title: 'السلامتك قبل كل شي',
      imageName: `1.png`
    },
    {
      title: 'اعمل الريزرفاسون وانت في دارك',
      imageName: `2.png`
    },
    {
      title: 'تبع الفوايج متاعك دقيقة بدقيقة',
      imageName: `3.png`
    }
  ];
}