import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/profile/series")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/profile/series"!</div>;
}
