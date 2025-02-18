import { Component, Input } from '@angular/core';
import { Movie } from '../_models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() public movie!: Movie;
}
