import { Routes } from '@angular/router';
import { OnboardingComponent } from './auth/onboarding/OnboardingComponent';
import { LoginComponent } from './auth/login/LoginComponent';
import { SearchComponent } from './search/SearchComponent';
import { ResultsComponent } from './results/ResultsComponent';

export const routes: Routes = [
  { path: 'auth', component: OnboardingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'results', component: ResultsComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
