import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Response } from '../types';
import { baseUrl } from './url';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);

  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Observable<Response<{ accessToken: string; user: User }>> {
    return this.http.post<Response<{ accessToken: string; user: User }>>(
      `${baseUrl}/users/login`,
      { username, password },
    );
  }

  logout() {
    return this.http.post(`${baseUrl}/users/logout`, {});
  }
}
