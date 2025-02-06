import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import serverApi from "../../api/serverApi";
import MovieListBannerCard from "@/components/MovieListBannerCard";

export const Route = createLazyFileRoute("/profile/movies")({
  component: RouteComponent,
});

function RouteComponent() {
  const [movies, setMovies] = useState<any[]>([]); // TODO: Fix type
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const moviesData = await serverApi.getMovies();
        setMovies(moviesData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch movies."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="h-screen">Loading movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="p-2">
        <div className="p-2">
          <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {movies.map((movie) => (
              <MovieListBannerCard
                key={movie.id}
                movie={movie}
                rankBase={5}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
