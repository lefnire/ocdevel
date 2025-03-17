import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OCDevel" },
    { name: "description", content: "Machine Learning Guide podcast, treadmill desks, and life hacks." },
  ];
}

export default function Home() {
  return <Welcome />;
}
