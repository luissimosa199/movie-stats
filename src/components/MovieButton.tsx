// MovieButton.tsx
import moviesApi from "@/api/moviesApi";
import serverApi from "@/api/serverApi";
import { MovieButtonType, UnifiedMovie } from "@/types";

interface MovieButtonProps {
  type: MovieButtonType;
  movie: UnifiedMovie;
}

export const MovieButton: React.FC<MovieButtonProps> = ({ type, movie }) => {
  const addToList = async (movie: UnifiedMovie) => {
    const movieDetails = await moviesApi.getMovieDetails(movie.id);
    serverApi.addMovie({ movie, ...movieDetails });
    console.log("Add to list", movie.id);
  };

  const removeFromList = (movie: UnifiedMovie) => {
    console.log("Remove from list", movie.id);
  };

  const markAsWatched = (movie: UnifiedMovie) => {
    console.log("Mark as watched", movie.id);
  };

  if (type === MovieButtonType.ADD_TO_LIST) {
    return (
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          addToList(movie);
        }}
      >
        Add to list
      </button>
    );
  } else if (type === MovieButtonType.WATCHED) {
    return (
      <button
        className="btn btn-sm btn-outline btn-primary"
        onClick={() => {
          markAsWatched(movie);
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
          removeFromList(movie);
        }}
      >
        Remove
      </button>
    );
  }
};
