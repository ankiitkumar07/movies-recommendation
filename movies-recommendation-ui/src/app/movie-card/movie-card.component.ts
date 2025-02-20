import { Component, HostListener, inject, Input, signal } from '@angular/core';
import { Movie } from '../_models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MoviePosterDirective } from './movie-poster.directive';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MoviePosterDirective,
    MatButtonModule,
  ],
  providers: [MovieService],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  private readonly movieService = inject(MovieService);
  @Input() public movie!: Movie;

  @HostListener('mouseover')
  public showDetailsButton() {
    this.hovered.set(true);
  }
  @HostListener('mouseleave')
  public hideDetailsButton() {
    this.hovered.set(false);
  }

  public hovered = signal(false);

  public saveMovie() {
    this.movieService.saveMovie(this.movie._id).subscribe({
      next: (res) => console.log('res', res),
    });
  }
}
