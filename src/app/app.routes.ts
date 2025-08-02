import { Routes } from '@angular/router';
import { OnboardingComponent } from './auth/onboarding/OnboardingComponent';
import { LoginComponent } from './auth/login/LoginComponent';
import { SignupComponent } from './auth/signup/SignupComponent';

export const routes: Routes = [
  { path: 'auth', component: OnboardingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
