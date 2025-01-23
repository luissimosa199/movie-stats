export interface TMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  id: number;
  tmdb_id: number;
  imdb_id: string;
  created_at: string;
  updated_at: string;
  watched_at?: string | null;
  title: string;
  overview?: string | null;
  release_date?: string | null;
  runtime?: number | null;
  genres?: string[] | null;
  poster_url?: string | null;
  score?: number | null;
}

export enum MovieButtonType {
  "ADD_TO_LIST",
  "REMOVE_FROM_LIST",
  "WATCHED",
}
