import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { APIResponseI } from '../_models/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly rootUrl = environment.apiUrl;

  private readonly __userId = signal<string | null>(null);
  public userLoggedIn = computed(() => this.__userId() !== null);

  public get userId() {
    return this.__userId();
  }

  public createUserSession() {
    const userId = localStorage.getItem('uid');
    if (!userId) {
      this.getNewUserId().subscribe({
        next: (res) => console.log(res),
      });
    } else {
      this.__userId.set(userId);
    }
  }
  public getNewUserId() {
    return this.http
      .post<APIResponseI<string>>(`${this.rootUrl}/auth/createUser`, null)
      .pipe(
        map((res) => {
          if (res.status == 201 && res.data) {
            localStorage.setItem('uid', res.data);
            this.__userId.set(res.data);
          }
        })
      );
  }
}
