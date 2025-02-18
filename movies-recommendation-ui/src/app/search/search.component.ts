import { Component, inject, OnInit, signal } from '@angular/core';
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
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MaterialModules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MovieCardComponent,
  ],
  providers: [SearchService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private readonly searchService = inject(SearchService);

  public searchForm: FormGroup<SearchFormInterface> = new FormGroup({
    search: new FormControl(''),
  });

  public searched = signal(false);

  public movies: Movie[] = [
    {
      title: 'New Movie',
      rating: 3.4,
      votes: 1043,
      source: 'IMDb',
    },
    {
      title: 'Danger Ranga',
      rating: 5.4,
      votes: 1043,
      source: 'IMDb',
    },
    {
      title: 'Queen',
      rating: 7,
      votes: 1043,
      source: 'IMDb',
    },
    {
      title: 'Animal',
      rating: 8.2,
      votes: 1043,
      source: 'IMDb',
    },
  ];

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe({
      next: (res) => {
        console.log(res);
        this.onSearch(res.search ?? '');
      },
    });
  }

  public onSearch(text: string) {
    this.searched.set(true);
    this.searchService.search(text).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}

export interface SearchFormInterface {
  search: FormControl<string | null>;
}
