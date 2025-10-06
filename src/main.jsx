import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { initializeCsrf } from '@/lib/bootstrap';

const renderApp = () => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
};

initializeCsrf()
  .then(() => {
    console.log("CSRF inicializado correctamente");
    renderApp();
  })
  .catch((error) => {
    console.warn(
      "No se pudo inicializar CSRF, pero continuando con la app:",
      error
    );
    renderApp();
  });
