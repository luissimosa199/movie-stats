import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/series")({
  component: Series,
});

function Series() {
  return <div className="p-2">Hello from About!</div>;
}
