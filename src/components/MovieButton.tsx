// MovieButton.tsx
import { MovieButtonType, UnifiedMovie } from "@/types";
import { Suspense, useState, useEffect } from "react";
import serverApi from "@/api/serverApi";

interface MovieButtonProps {
  type: MovieButtonType;
  movie: UnifiedMovie;
}

const MovieButtonComponent: React.FC<MovieButtonProps> = ({ type, movie }) => {
  const [isInList, setIsInList] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      if (
        type === MovieButtonType.ADD_TO_LIST ||
        type === MovieButtonType.REMOVE_FROM_LIST
      ) {
        setLoading(true);
        try {
          const result = await serverApi.checkMovieInList(movie.id);
          setIsInList(result);
        } catch (error) {
          console.error("Failed to fetch initial state:", error);
          setIsInList(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchInitialState();
  }, [movie.id]);

  const handleAddToList = async (movieId: number) => {
    console.log("Add to list", movieId);
    setIsInList(true);
  };

  const handleRemoveFromList = async (movieId: number) => {
    console.log("Remove from list", movieId);
    setIsInList(false);
  };

  const markAsWatched = (movieId: number) => {
    console.log("Mark as watched", movieId);
  };

  if (loading) {
    return (
      <button
        className="btn btn-sm btn-primary"
        disabled
      >
        Loading...
      </button>
    );
  }

  if (type === MovieButtonType.ADD_TO_LIST) {
    return (
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          handleAddToList(movie.id);
        }}
      >
        {isInList === null
          ? "Add to list"
          : isInList
            ? "Remove from list"
            : "Add to list"}
      </button>
    );
  } else if (type === MovieButtonType.WATCHED) {
    return (
      <button
        className="btn btn-sm btn-outline btn-primary"
        onClick={() => {
          markAsWatched(movie.id);
        }}
      >
        Watched
      </button>
    );
  } else if (type === MovieButtonType.REMOVE_FROM_LIST) {
    return (
      <button
        className="btn btn-sm btn-error"
        onClick={() => {
          handleRemoveFromList(movie.id);
        }}
      >
        {isInList === null ? "Remove" : isInList ? "Remove" : "Removed"}
      </button>
    );
  }
};

export const MovieButton: React.FC<MovieButtonProps> = (props) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MovieButtonComponent {...props} />
    </Suspense>
  );
};
