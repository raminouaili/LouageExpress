import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileSettingsComponent {
  constructor(public router: Router) {}

  /* Accordéons */
  paymentOpen = false;
  langOpen    = false;

  /* Modèles */
  paymentMethod: 'wallet' | 'card' | 'cash' = 'wallet';
  language: 'fr' | 'ar' = 'fr';
  notifyPush = true;
  notifyEmail = false;
  notifySms = false;
  darkMode = false;
}
