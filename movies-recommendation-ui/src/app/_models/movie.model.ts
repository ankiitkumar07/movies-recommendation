export interface Movie extends MovieRating {
  title: string;
}

export interface MovieRating {
  rating: number;
  votes: number;
  source: string;
}
