import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['../auth-shared.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/search']),
      error: () => {
        this.error = 'Identifiants invalides';
        form.controls['email']?.setErrors({ invalid: true });
        form.controls['password']?.setErrors({ invalid: true });
        form.controls['email']?.markAsTouched();
        form.controls['password']?.markAsTouched();
      }
    });
  }
}
