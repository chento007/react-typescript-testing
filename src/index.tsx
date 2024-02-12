import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { NextUIProvider } from "@nextui-org/react";

// Find the element to attach the React app
const container = document.getElementById("root");

// Ensure the container is not null
if (container !== null) {
  const root = createRoot(container); // Create a root for the app

  root.render(
    <React.StrictMode>
      <NextUIProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NextUIProvider>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
