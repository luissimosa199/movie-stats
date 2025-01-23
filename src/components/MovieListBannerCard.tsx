import { TMDBMovie, Movie, MovieButtonType } from "@/types";
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { MovieButton } from "./MovieButton";
import StarRating from "./StarRating";

// Unified movie type combining TMDBMovie and Movie
type UnifiedMovie = TMDBMovie & Partial<Movie>;

interface MovieCardProps {
  movie: UnifiedMovie;
  rankBase: 5 | 10;
}

interface ExpandButtonProps {
  isExpanded: boolean;
  toggleExpand: () => void;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({
  isExpanded,
  toggleExpand,
}) => {
  return (
    <button onClick={toggleExpand}>
      {isExpanded ? "See less" : "See more"}
    </button>
  );
};

const MovieListBannerCard: React.FC<MovieCardProps> = ({
  movie,
  rankBase = 10,
}) => {
  const [expandOverview, setExpandOverview] = useState<boolean>(false);

  const isFromList = rankBase !== 10;

  const toggleExpand = () => setExpandOverview(!expandOverview);

  return (
    <div className="my-4">
      <div className="card card-side bg-base-100 shadow-xl">
        <Link to={"/movie/" + movie.id}>
          <figure>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : movie.poster_url || "https://via.placeholder.com/200"
              }
              alt={movie.title || "Untitled"}
            />
          </figure>
        </Link>
        <div className="card-body">
          <div className="flex flex-row gap-2 justify-between">
            <div>
              <h3 className="card-title">{movie.title || "Untitled"}</h3>
              <span>{isFromList && `Watched: ${movie.watched_at}`}</span>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              {isFromList &&
                movie.score !== undefined &&
                movie.score !== null && (
                  <p>
                    {movie.score}
                    {rankBase && `/${rankBase}`}
                  </p>
                )}
              {!isFromList &&
                movie.vote_average !== undefined &&
                movie.vote_average !== null && (
                  <p>
                    {movie.vote_average}
                    {rankBase && `/${rankBase}`}
                  </p>
                )}
              {isFromList &&
                movie.vote_count !== undefined &&
                movie.vote_count !== null && <p>({movie.vote_count})</p>}
            </div>
          </div>

          <div>
            <p className="text-sm">
              {expandOverview ? (
                <>
                  {movie.overview || "No overview available."}{" "}
                  <ExpandButton
                    isExpanded={expandOverview}
                    toggleExpand={toggleExpand}
                  />
                </>
              ) : (
                <>
                  {movie.overview
                    ? `${movie.overview.slice(0, 140)}... `
                    : "No overview available."}
                  <ExpandButton
                    isExpanded={expandOverview}
                    toggleExpand={toggleExpand}
                  />
                </>
              )}
            </p>
          </div>
          {isFromList && (
            <div>
              <StarRating
                movieId={movie.id}
                score={movie.score || 0}
              />
            </div>
          )}
          <div className="card-actions justify-end">
            <MovieButton
              type={
                isFromList
                  ? MovieButtonType.REMOVE_FROM_LIST
                  : MovieButtonType.ADD_TO_LIST
              }
              movieId={movie.id}
            />
            <MovieButton
              type={MovieButtonType.WATCHED}
              movieId={movie.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListBannerCard;
