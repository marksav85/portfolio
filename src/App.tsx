import { Header } from "./components/Header/Header";
import { MainView } from "./components/Main/MainView";
import { useGetLanguages } from "./hooks/useGetLanguages";

function App() {
  const { data, error } = useGetLanguages();

  if (error && !data) {
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
    </div>
  );
}

export default App;
