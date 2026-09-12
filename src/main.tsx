import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext";
import { PortfolioContentProvider } from "./context/PortfolioContentContext";

import "./assets/css/main.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <LanguageProvider>
    <PortfolioContentProvider>
      <App />
    </PortfolioContentProvider>
  </LanguageProvider>,
);
