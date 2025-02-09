// Index.tsx
import { createLazyFileRoute } from "@tanstack/react-router";
import { MovieListBanner } from "../components/MovieListBanner.tsx";
import MovieSearch from "../components/MovieSearch.tsx";
import { useState } from "react";
import { TMDBMovie, Movie } from "@/types";
import MovieListBannerCard from "@/components/MovieListBannerCard";

type UnifiedMovie = TMDBMovie & Partial<Movie>;

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [searchResults, setSearchResults] = useState<UnifiedMovie[]>([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>
      <MovieSearch setResults={setSearchResults} />
      {searchResults.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          {searchResults.map((movie) => (
            <MovieListBannerCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
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
