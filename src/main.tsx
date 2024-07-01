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
  // uri: import.meta.env.VITE_LOCAL_URL,
  cache: new InMemoryCache(),
});

persistCache({
  cache: client.cache,
  storage: window.localStorage,
});

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <LanguageProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </LanguageProvider>
  );
} else {
  console.error("Root element not found");
}
