import { useState, useEffect } from "react";
import moviesApi from "../api/moviesApi";
import { UnifiedMovie, MovieButtonType } from "@/types";
import { MovieButton } from "../components/MovieButton";

export default function MovieDetailPage({ movieId }: { movieId: string }) {
  const [movie, setMovie] = useState<UnifiedMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFromList = false;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await moviesApi.movie(movieId);
        // TODO: Verify if the movie is in list
        setMovie(data);
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

  if (movie) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{movie.title}</h1>
            <p className="py-6">{movie.overview}</p>
            <div className="flex gap-2 justify-end">
              <MovieButton
                type={MovieButtonType.ADD_TO_LIST}
                movie={movie}
                isInList={isFromList}
              />
              <MovieButton
                type={MovieButtonType.WATCHED}
                movie={movie}
                isInList={isFromList}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
