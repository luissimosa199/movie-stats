import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../App.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <Link
            to="/"
            className="hover:underline"
          >
            Movies
          </Link>
          <Link
            to="/series"
            className="hover:underline"
          >
            Series
          </Link>
        </div>
        <Link
          to="/profile"
          className="hover:underline"
        >
          Profile
        </Link>
      </div>

      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
