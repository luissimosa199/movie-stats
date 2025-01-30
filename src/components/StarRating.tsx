// StarRating.tsx
import serverApi from "@/api/serverApi";
import React from "react";

interface StarRatingProps {
  score: number;
  movieId: number;
}

const StarRating: React.FC<StarRatingProps> = ({ score, movieId }) => {
  const [_newScore, setNewScore] = React.useState(score);

  const handleStarClick = async (index: number) => {
    const newScore = index + 1;
    setNewScore(newScore); // Optimistically update the UI

    try {
      // Send the updated score to the server
      console.log("score", newScore);
      await serverApi.setNewScore(movieId, newScore);
      console.log("New score sent to server:", newScore);
    } catch (error) {
      // If there's an error, revert to the previous score
      console.error("Failed to update score:", error);
      setNewScore(score); // Revert to the original score if request fails
    }
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const isFilled = index < _newScore; // Use the optimistically updated score

        return (
          <div
            key={index}
            onClick={() => handleStarClick(index)}
            className={`w-5 h-5 cursor-pointer transition-colors duration-200 
              ${isFilled ? "text-yellow-500" : "text-gray-300"} 
              hover:text-yellow-300`} // Lighter yellow on hover
          >
            ★
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
