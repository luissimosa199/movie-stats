// MovieButton.tsx
import { MovieButtonType, UnifiedMovie, MovieHistoryDetails } from "@/types";
import { Suspense, useState, useEffect } from "react";
import serverApi from "@/api/serverApi";

interface MovieButtonProps {
  type: MovieButtonType;
  movie: UnifiedMovie;
  isInList: boolean;
}

const MovieButtonComponent: React.FC<MovieButtonProps> = ({
  type,
  movie,
  isInList,
}) => {
  const [movieHistoryDetails, setMovieHistoryDetails] =
    useState<MovieHistoryDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      if (
        type === MovieButtonType.ADD_TO_LIST ||
        type === MovieButtonType.REMOVE_FROM_LIST ||
        type === MovieButtonType.WATCHED
      ) {
        setLoading(true);
        try {
          if (!isInList) {
            const result = await serverApi.getMovieHistoryDetail(movie.id);
            setMovieHistoryDetails(result);
          } else {
            setMovieHistoryDetails({
              isInList: true,
              watched_at: movie.watched_at || null,
            });
          }
        } catch (error) {
          console.error("Failed to fetch initial state:", error);
          setMovieHistoryDetails(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchInitialState();
  }, []);

  const handleAddToList = async (movieId: number) => {
    console.log("Add to list", movieId);
    if (movieHistoryDetails) {
      setMovieHistoryDetails({ ...movieHistoryDetails, isInList: true });
    }
  };

  const handleRemoveFromList = async (movieId: number) => {
    console.log("Remove from list", movieId);
    if (movieHistoryDetails) {
      setMovieHistoryDetails({ ...movieHistoryDetails, isInList: false });
    }
  };

  const markAsWatched = async (movieId: number) => {
    console.log("Mark as watched", movieId);
    if (movieHistoryDetails) {
      setMovieHistoryDetails({
        ...movieHistoryDetails,
        watched_at: new Date().toISOString(),
      });
    }
  };

  console.log("movie", movie);

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
        {movieHistoryDetails?.isInList === null
          ? "Add to list"
          : movieHistoryDetails?.isInList
            ? "Remove from list"
            : "Add to list"}
      </button>
    );
  } else if (type === MovieButtonType.WATCHED) {
    return (
      <button
        className="btn btn-sm btn-outline btn-primary disabled:text-slate-500"
        disabled={!!movieHistoryDetails?.watched_at}
        onClick={() => {
          markAsWatched(movie.id);
        }}
      >
        {movieHistoryDetails?.watched_at
          ? `Watched on ${new Date(movieHistoryDetails.watched_at).toLocaleDateString()}`
          : "Watched"}
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
        {movieHistoryDetails?.isInList ? "Remove" : "Add to list"}
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
