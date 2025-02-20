import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly rootUrl = environment.apiUrl;

  public saveMovie(movieId: string) {
    return this.http.patch(
      `${this.rootUrl}/user/${this.authService.userId}/movies`,
      [movieId]
    );
  }
}
