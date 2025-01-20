import { MovieButtonType } from "@/types";

interface MovieButtonProps {
  type: MovieButtonType;
  movieId: number;
}

export const MovieButton: React.FC<MovieButtonProps> = ({ type, movieId }) => {
  const handleMovieButtonClick = () => {
    console.log(movieId);
  };

  if (type === MovieButtonType.ADD_TO_LIST) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => {
          handleMovieButtonClick();
        }}
      >
        Add to list
      </button>
    );
  } else if (type === MovieButtonType.WATCHED) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => {
          handleMovieButtonClick();
        }}
      >
        Watched
      </button>
    );
  }
};
