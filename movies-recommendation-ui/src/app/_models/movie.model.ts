export interface Movie {
  _id: string;
  plot: string;
  genres: Array<string>;
  runtime: number;
  cast: Array<string>;
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: Array<string>;
  released: string;
  directors: Array<string>;
  writers: Array<string>;
  awards: IMovieAwards;
  lastupdated: string;
  year: number;
  imdb: IMovieRating;
  countries: Array<string>;
  type: string;
}

export interface IMovieRating {
  rating: number;
  votes: number;
  id: number;
}

export interface IMovieAwards {
  wins: number;
  nominations: number;
  text: string;
}
