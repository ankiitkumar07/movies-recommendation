import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../_models/movie.model';
import { APIResponseI } from '../_models/api-response.interface';
@Injectable()
export class SearchService {
  private readonly http = inject(HttpClient);
  private readonly rootUrl = environment.apiUrl;

  public search(q: string): Observable<Array<Movie>> {
    return this.http
      .get<APIResponseI<Array<Movie>>>(`${this.rootUrl}/search`, {
        params: {
          q,
        },
      })
      .pipe(map((res) => res.data));
  }
}
