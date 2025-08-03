import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

export interface UserProfile {
  email: string;
  preferences: { [key: string]: any };
}

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private http: HttpClient) {}

  /** Retrieve current user profile from backend. */
  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.apiUrl}/users/me`);
  }

  /** Update user preferences */
  updatePreferences(prefs: { [key: string]: any }): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${environment.apiUrl}/users/me/preferences`, prefs);
  }
}
