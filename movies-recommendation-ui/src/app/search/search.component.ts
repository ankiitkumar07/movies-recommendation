import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MaterialModules } from '../material';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Movie } from '../_models/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SearchService } from '../_services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MaterialModules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MovieCardComponent,
    MatGridListModule,
  ],
  providers: [SearchService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly searchService = inject(SearchService);

  public searchForm: FormGroup<SearchFormInterface> = new FormGroup({
    search: new FormControl(''),
  });

  public searched = signal(false);

  public movies: Movie[] = [];

  private readonly unsub$ = new Subject<void>();

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.unsub$))
      .subscribe({
        next: (res) => {
          this.onSearch(res.search ?? '');
        },
      });
  }

  public onSearch(text: string) {
    this.searched.set(true);
    if (!text) {
      this.movies = [];
      return;
    }
    this.searchService.search(text).subscribe({
      next: (res) => {
        this.movies = res;
      },
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
}

export interface SearchFormInterface {
  search: FormControl<string | null>;
}
