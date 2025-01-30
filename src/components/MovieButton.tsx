// MovieButton.tsx
import { MovieButtonType } from "@/types";

interface MovieButtonProps {
  type: MovieButtonType;
  movieId: number;
}

export const MovieButton: React.FC<MovieButtonProps> = ({ type, movieId }) => {
  // const handleMovieButtonClick = () => {
  //   console.log(movieId);
  // };

  const addToList = (movieId: number) => {
    console.log("Add to list", movieId);
  };

  const removeFromList = (movieId: number) => {
    console.log("Remove from list", movieId);
  };

  const markAsWatched = (movieId: number) => {
    console.log("Mark as watched", movieId);
  };

  if (type === MovieButtonType.ADD_TO_LIST) {
    return (
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          addToList(movieId);
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
          markAsWatched(movieId);
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
          removeFromList(movieId);
        }}
      >
        Remove
      </button>
    );
  }
};
