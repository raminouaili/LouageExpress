import { Routes } from '@angular/router';
import { OnboardingComponent } from './auth/onboarding/OnboardingComponent';
import { LoginComponent } from './auth/login/LoginComponent';
import { SearchComponent } from './search/SearchComponent';
import { ResultsComponent } from './results/ResultsComponent';
import { SignupComponent } from './auth/signup/SignupComponent';
import { TripDetailComponent } from './trip-detail/TripDetailComponent';

export const routes: Routes = [
  { path: 'auth', component: OnboardingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'trip/:id', component: TripDetailComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
