import { Routes } from '@angular/router';
import { OnboardingComponent } from './auth/onboarding/OnboardingComponent';
import { LoginComponent } from './auth/login/LoginComponent';
import { SearchComponent } from './search/SearchComponent';
import { ResultsComponent } from './results/ResultsComponent';
import { SignupComponent } from './auth/signup/SignupComponent';
import { ProfileSettingsComponent } from './profile-settings/ProfileSettingsComponent';
import { SupportFeedbackComponent } from './support-feedback/SupportFeedbackComponent';

export const routes: Routes = [
  { path: 'auth', component: OnboardingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'profile', component: ProfileSettingsComponent },
  { path: 'support', component: SupportFeedbackComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
