import { Movie } from "@/types";
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";

interface MovieCardProps {
  movie: Movie;
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

const MovieListBannerCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [expandOverview, setExpandOverview] = useState<boolean>(false);

  const toggleExpand = () => setExpandOverview(!expandOverview);

  return (
    <div className="my-4">
      <div className="card card-side bg-base-100 shadow-xl">
        <Link to={"/movie/" + movie.id}>
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
          </figure>
        </Link>
        <div className="card-body">
          <div className="flex flex-row gap-2 justify-between">
            <h3 className="card-title">{movie.title}</h3>
            <div className="flex flex-row justify-center items-center gap-2">
              <p>{movie.vote_average}/10</p>
              <p>({movie.vote_count})</p>
            </div>
          </div>
          <div>
            <p className="text-sm">
              {expandOverview ? (
                <>
                  {movie.overview}{" "}
                  <ExpandButton
                    isExpanded={expandOverview}
                    toggleExpand={toggleExpand}
                  />
                </>
              ) : (
                <>
                  {`${movie.overview.slice(0, 140)}... `}
                  <ExpandButton
                    isExpanded={expandOverview}
                    toggleExpand={toggleExpand}
                  />
                </>
              )}
            </p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Add to list</button>
            <button className="btn btn-primary">Watched</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListBannerCard;
