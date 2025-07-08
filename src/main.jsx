import { createRoot } from "react-dom/client";
import { restaurants } from "./assets/mock";
import { App } from "./components/app/app";

createRoot(document.getElementById("root"))
  .render(<App restaurants={restaurants}/>);
