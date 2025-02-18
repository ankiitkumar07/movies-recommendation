import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class SearchService {
  private readonly http = inject(HttpClient);
  private readonly rootUrl = environment.apiUrl;

  public search(q: string): Observable<any> {
    return this.http.get(`${this.rootUrl}/search`, {
      params: {
        q,
      },
    });
  }
}
