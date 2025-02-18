import { Component, HostListener, Input, signal } from '@angular/core';
import { Movie } from '../_models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MoviePosterDirective } from './movie-poster.directive';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MoviePosterDirective,
    MatButtonModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
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
}
