// Index.tsx
import { createLazyFileRoute } from "@tanstack/react-router";
import { MovieListBanner } from "../components/MovieListBanner.tsx";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="container mx-auto p-4 bg-slate-100 dark:bg-slate-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
      <MovieListBanner
        title="Popular Movies"
        route="popular"
      />
      <MovieListBanner
        title="Upcoming Movies"
        route="upcoming"
      />
    </div>
  );
}
