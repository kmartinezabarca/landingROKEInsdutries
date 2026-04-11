import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { initializeCsrf } from "@/lib/bootstrap";
import { initSentry } from "@/lib/sentry";
import { initAnalytics } from "@/lib/analytics";

// i18n — debe importarse antes de renderizar para que las traducciones estén listas
import "@/lib/i18n";

// Inicializar servicios lo antes posible
initSentry();
initAnalytics();

const renderApp = () => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
};

// Inicializar CSRF antes de montar la app.
// Si falla (backend no disponible), la app igual arranca en modo degradado.
initializeCsrf()
  .then(renderApp)
  .catch(renderApp);
