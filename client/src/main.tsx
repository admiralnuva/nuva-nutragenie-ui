import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found");
} else {
  console.log("Root element found, mounting React app");
  try {
    createRoot(rootElement).render(<App />);
    console.log("React app mounted successfully");
  } catch (error) {
    console.error("Error mounting React app:", error);
  }
}
