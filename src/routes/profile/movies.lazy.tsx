import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/profile/movies")({
  component: RouteComponent,
});

async function createNoteAction() {
  "use server";

  console.log("Hello, world!");

  return "Hello, world!";
}

async function RouteComponent() {
  const note = await createNoteAction();
  return <div>Hello "/profile/movies"! {note}</div>;
}
