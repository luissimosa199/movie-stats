import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Profile</h2>
      <div>
        <Link to="/profile/movies">
          <h3>Movies</h3>
        </Link>
      </div>
      <div>
        <h3>Series</h3>
      </div>
    </div>
  );
}
