import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileSettingsComponent {}
