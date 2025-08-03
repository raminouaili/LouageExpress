import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './signup.component.html',
  styleUrls: ['../auth-shared.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignupComponent {
  step = 1;
  userType: 'passenger' | 'driver' | '' = '';

  general = {
    name: '',
    email: '',
    password: ''
  };

  phone = '';
  verificationCode = '';
  idNumber = '';
  licenseNumber = '';

  nextStep(): void {
    if (this.step === 3 && this.userType !== 'driver') {
      this.finish();
      return;
    }
    this.step++;
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  finish(): void {
    // Placeholder for registration logic
    console.log('User registered as', this.userType);
  }
}
