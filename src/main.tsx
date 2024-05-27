import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./assets/css/main.css";

// apollo client
const client = new ApolloClient({
  uri: "https://strapi-ai51.onrender.com/graphql",
  cache: new InMemoryCache(),
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
