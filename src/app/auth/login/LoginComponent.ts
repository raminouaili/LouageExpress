import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FakeApiService } from '../../services/fake-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['../auth-shared.css', './login.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private api: FakeApiService) {}

  onSubmit(): void {
    this.api.login(this.email, this.password).subscribe((res) => {
      console.log('Fake login success', res);
    });
  }
}
