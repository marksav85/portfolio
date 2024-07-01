import { Header } from "./components/Header/Header";
import { MainView } from "./components/Main/MainView";
import { Footer } from "./components/Main/Footer/Footer";
import { useGetLanguages } from "./hooks/useGetLanguages";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./index.css";

function App() {
  const { loading, error } = useGetLanguages();
  const [color, setColor] = useState("blue");

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader
          color={color}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

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
