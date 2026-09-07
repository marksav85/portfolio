import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import "./assets/css/main.css";

// apollo client
const client = new ApolloClient({
  uri: import.meta.env.VITE_STRAPI_URL,
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");

async function bootstrap() {
  try {
    // Invalidate the previous flattened cache once, including on endpoint changes.
    const cacheVersion = `strapi-v4:${import.meta.env.VITE_STRAPI_URL}`;
    if (localStorage.getItem("portfolio-cms-cache-version") !== cacheVersion) {
      localStorage.removeItem("apollo-cache-persist");
      localStorage.setItem("portfolio-cms-cache-version", cacheVersion);
    }
    await persistCache({ cache: client.cache, storage: window.localStorage });
  } catch {
    // Keep the in-memory client usable when browser storage is unavailable.
    console.warn("CMS cache persistence is unavailable.");
  }
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }
  ReactDOM.createRoot(rootElement).render(
    <LanguageProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </LanguageProvider>
  );
}

void bootstrap();
