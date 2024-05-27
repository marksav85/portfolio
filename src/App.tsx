import { Header } from "./components/Header/Header";
import { MainView } from "./components/Main/MainView";
import { Footer } from "./components/Main/Footer/Footer";
import { useGetLanguages } from "./hooks/useGetLanguages";

function App() {
  const { loading, error } = useGetLanguages();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Header />
      <MainView />
      <Footer />
    </div>
  );
}

export default App;
