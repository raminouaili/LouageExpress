import { Routes } from '@angular/router';
import { OnboardingComponent } from './auth/onboarding/OnboardingComponent';
import { LoginComponent } from './auth/login/LoginComponent';

export const routes: Routes = [
  { path: 'auth', component: OnboardingComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
