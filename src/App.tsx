import { Header } from "./components/Header/Header";
import { MainView } from "./components/Main/MainView";
import { Footer } from "./components/Main/Footer/Footer";
import { useGetLanguages } from "./hooks/useGetLanguages";
import { useState } from "react";
import "./index.css";

function App() {
  const { error } = useGetLanguages();

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <p>Oops! Something went wrong.</p>
          <p>Bugs are currently being squashed.</p>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <MainView />
      <Footer />
    </div>
  );
}

export default App;
