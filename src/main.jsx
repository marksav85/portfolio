import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./assets/css/main.css";

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </LanguageProvider>
);
