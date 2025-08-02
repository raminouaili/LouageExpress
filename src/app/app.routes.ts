import { Routes } from '@angular/router';
import { OnboardingComponent } from './auth/onboarding/OnboardingComponent';

export const routes: Routes = [
  { path: 'auth', component: OnboardingComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
