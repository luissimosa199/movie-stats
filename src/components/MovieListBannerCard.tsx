// MovieListBannerCard.tsx
import { UnifiedMovie, MovieButtonType } from "@/types";
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { MovieButton } from "./MovieButton";
import StarRating from "./StarRating";

interface MovieCardProps {
  movie: UnifiedMovie;
  rankBase?: 5 | 10;
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
    <button
      className="text-lg text-blue-500 font-bold mx-auto my-2 block hover:text-blue-700 focus:outline-none"
      onClick={toggleExpand}
    >
      {isExpanded ? "See less" : "See more"}
    </button>
  );
};

const MovieListBannerCard: React.FC<MovieCardProps> = ({
  movie,
  rankBase = 10,
}) => {
  const [expandOverview, setExpandOverview] = useState<boolean>(false);

  const isFromList = movie.isInList || rankBase !== 10;

  const toggleExpand = () => setExpandOverview(!expandOverview);

  return (
    <div className="card card-compact bg-base-100 shadow-xl w-full md:w-80 mb-4">
      <Link
        to={"/movie/" + movie.id}
        className="block"
      >
        <div className="relative w-full pb-[150%] md:pb-[66.66%] lg:pb-[56.25%] overflow-hidden rounded-2xl">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` // changed to w780
                : movie.poster_url || "https://via.placeholder.com/200"
            }
            alt={movie.title || "Untitled"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="card-body justify-between">
        <div className="flex flex-row gap-2 justify-between items-center">
          <div>
            <h3 className="card-title text-lg font-semibold">
              {movie.title || "Untitled"} ({movie.release_date?.slice(0, 4)})
            </h3>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            {isFromList &&
              movie.score !== undefined &&
              movie.score !== null && (
                <p className="text-sm font-medium">
                  {movie.score}
                  {rankBase && `/${rankBase}`}
                </p>
              )}
            {!isFromList &&
              movie.vote_average !== undefined &&
              movie.vote_average !== null && (
                <p className="text-sm font-medium">
                  {movie.vote_average.toFixed(1)}
                  {rankBase && `/${rankBase}`}
                </p>
              )}
            {isFromList &&
              movie.vote_count !== undefined &&
              movie.vote_count !== null && (
                <p className="text-sm text-gray-500">({movie.vote_count})</p>
              )}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm dark:text-gray-200 text-gray-600">
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
          <div className="mt-2">
            <StarRating
              movieId={movie.id}
              score={movie.score || 0}
            />
          </div>
        )}
        <div className="card-actions justify-end mt-4">
          <MovieButton
            type={
              isFromList
                ? MovieButtonType.REMOVE_FROM_LIST
                : MovieButtonType.ADD_TO_LIST
            }
            movie={movie}
            isInList={isFromList}
          />
          {isFromList && movie.watched_at ? (
            <div className="btn btn-sm btn-outline btn-primary disabled:text-slate-500">
              Watched on {new Date(movie.watched_at).toLocaleDateString()}
            </div>
          ) : (
            <MovieButton
              type={MovieButtonType.WATCHED}
              movie={movie}
              isInList={isFromList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieListBannerCard;
