import { createLazyFileRoute } from "@tanstack/react-router";
import { MovieListBanner } from "../components/MovieListBanner.tsx";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h1>Movies</h1>
      <MovieListBanner
        title="Popular Movies"
        route="popular"
      />
      <MovieListBanner
        title="Upcomming Movies"
        route="upcoming"
      />
    </div>
  );
}
