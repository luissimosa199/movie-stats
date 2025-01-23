import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import serverApi from "../../api/serverApi";
import MovieListBannerCard from "@/components/MovieListBannerCard";

export const Route = createLazyFileRoute("/profile/movies")({
  component: RouteComponent,
});

function RouteComponent() {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const moviesData = await serverApi.getMovies();
        console.log("Movies", moviesData);
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
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="p-2">
        <div>
          <h2>My Movie List</h2>
          <ul>
            {movies.map((movie) => (
              <MovieListBannerCard
                key={movie.id}
                movie={movie}
                rankBase={5}
              />
            ))}
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
}
