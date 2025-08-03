import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileSettingsComponent {
  constructor(public router: Router, private translate: TranslateService) {
    const lang = (localStorage.getItem('lang') as any) || 'fr';
    this.language = lang;
    this.translate.use(this.language);
  }

  /* Accordéons */
  paymentOpen = false;
  langOpen    = false;

  /* Modèles */
  paymentMethod: 'wallet' | 'card' | 'cash' = 'wallet';
  language: 'fr' | 'en' | 'ar-TN' = 'fr';
  notifyPush = true;
  notifyEmail = false;
  notifySms = false;
  darkMode = false;

  onLanguageChange() {
    this.translate.use(this.language);
    localStorage.setItem('lang', this.language);
  }
}
