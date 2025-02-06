// components/MovieSearch.tsx
import React, { useState, useEffect, useRef } from "react";
import moviesApi from "@/api/moviesApi"; // Assuming your API setup
import { TMDBMovie, Movie } from "@/types";

type UnifiedMovie = TMDBMovie & Partial<Movie>;
interface MovieSearchProps {
  setResults: React.Dispatch<React.SetStateAction<UnifiedMovie[]>>;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Using useRef to store timeout
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup function to clear previous timeout
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      if (newSearchTerm.trim() === "") {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await moviesApi.search(newSearchTerm, { page: 1 });
        setResults(data.results as UnifiedMovie[]);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="mb-6 w-1/2 mx-auto">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="input input-bordered w-full dark:bg-slate-800 dark:text-white"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {loading && <div className="mt-2 text-gray-500">Loading...</div>}
      {error && <div className="mt-2 text-red-500">Error: {error}</div>}
    </div>
  );
};

export default MovieSearch;
