import { useState, useEffect } from "react";
import moviesApi from "../api/moviesApi";
import MovieListBannerCard from "./MovieListBannerCard";
import { Movie } from "@/types";

interface MovieListBannerProps {
  title: string;
  route: string;
}

export const MovieListBanner: React.FC<MovieListBannerProps> = ({
  route,
  title,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await moviesApi.movie(route, { page: 1 });
        console.log("data", data);
        setMovies(data.results);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="p-2">Loading...</div>;
  }

  if (error) {
    return <div className="p-2">Error: {error}</div>;
  }

  return (
    <div className="p-2">
      <div>
        <h2>{title}</h2>
        <ul>
          {movies.map((movie) => (
            <MovieListBannerCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
};
