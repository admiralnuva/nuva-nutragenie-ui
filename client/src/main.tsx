import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found");
} else {

  try {
    createRoot(rootElement).render(<App />);

  } catch (error) {
    console.error("Error mounting React app:", error);
  }
}
