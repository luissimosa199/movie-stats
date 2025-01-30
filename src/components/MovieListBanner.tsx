import { useState, useEffect } from "react";
import moviesApi from "../api/moviesApi";
import MovieListBannerCard from "./MovieListBannerCard";
import { TMDBMovie, Movie } from "@/types";

type UnifiedMovie = TMDBMovie & Partial<Movie>;

interface MovieListBannerProps {
  title: string;
  route: string;
}

export const MovieListBanner: React.FC<MovieListBannerProps> = ({
  route,
  title,
}) => {
  const [movies, setMovies] = useState<UnifiedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await moviesApi.movie(route, { page: 1 });
        setMovies(data.results as UnifiedMovie[]);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [route]);

  if (loading) {
    return <div className="p-2">Loading...</div>;
  }

  if (error) {
    return <div className="p-2">Error: {error}</div>;
  }

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <MovieListBannerCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
};
