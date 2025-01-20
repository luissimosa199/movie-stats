import MovieDetailPage from "@/pages/MovieDetailPage";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/movie/$movieId")({
  component: MovieDetailComponent,
});

function MovieDetailComponent() {
  const { movieId } = Route.useParams();

  return (
    <div>
      <MovieDetailPage movieId={movieId} />
    </div>
  );
}
