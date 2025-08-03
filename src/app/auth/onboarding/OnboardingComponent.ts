import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { TranslateModule } from '@ngx-translate/core';


interface Slide {
  titleKey: string;
  imageName: string;
}
 @Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, TranslateModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['../auth-shared.css', './onboarding.component.css'],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnboardingComponent {

  faApple = faApple;
  faGoogle = faGoogle;
  slides: Slide[] = [
    { titleKey: 'onboarding.slide1', imageName: `1.png` },
    { titleKey: 'onboarding.slide2', imageName: `2.png` },
    { titleKey: 'onboarding.slide3', imageName: `3.png` }
  ];
}