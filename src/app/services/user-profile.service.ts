import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface UserProfile {
  email: string;
  preferences: { [key: string]: any };
}

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly storageKey = 'userProfile';

  constructor(private http: HttpClient) {}

  /** Retrieve current user profile. Uses localStorage as mock database. */
  getProfile(): Observable<UserProfile> {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      return of(JSON.parse(raw) as UserProfile);
    }
    const profile: UserProfile = {
      email: 'demo@louage-express.tn',
      preferences: {},
    };
    localStorage.setItem(this.storageKey, JSON.stringify(profile));
    return of(profile);
    // Real example:
    // return this.http.get<UserProfile>(`${environment.apiUrl}/users/me`);
  }

  /** Update user preferences */
  updatePreferences(prefs: { [key: string]: any }): Observable<UserProfile> {
    const profile = (JSON.parse(localStorage.getItem(this.storageKey) || '{}') as UserProfile) || {
      email: 'demo@louage-express.tn',
      preferences: {},
    };
    const updated: UserProfile = { ...profile, preferences: { ...profile.preferences, ...prefs } };
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
    return of(updated);
    // Real example:
    // return this.http.put<UserProfile>(`${environment.apiUrl}/users/me/preferences`, prefs);
  }
}
