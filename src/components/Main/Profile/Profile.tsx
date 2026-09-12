import { useState } from "react";
import { About } from "./About/About";
// Import Skeleton loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Optional: to include default skeleton styles

// Import language-related context and custom hook
import { useGetLanguages } from "../../../hooks/useGetLanguages";

export const Profile: React.FC = () => {
  // State to manage visibility of the "About" section
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility of the "About" section
  const toggleVisibility: () => void = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

  // Read the shared content and loading state together.
  const { data: language, loading } = useGetLanguages();
  const isInitialLoading = loading && language === null;

  return (
    <>
      {/* Profile section */}
      <section id="one">
        {/* Profile title */}
        <header className="major">
          {isInitialLoading ? (
            <Skeleton width={200} height={100} />
          ) : (
            <h2>{language?.profile?.Title}</h2>
          )}
        </header>

        {/* Profile text */}
        <p>
          {isInitialLoading ? <Skeleton count={10} /> : language?.profile?.Text}
        </p>

        {/* Button to toggle visibility of "About" section */}
        <ul className="actions">
          <li>
            {isInitialLoading ? (
              <Skeleton width={100} height={50} />
            ) : (
              <button onClick={toggleVisibility} className="button">
                {isVisible
                  ? language?.profile?.buttonHide
                  : language?.profile?.buttonShow}
              </button>
            )}
          </li>
        </ul>

        {/* Render "About" section if isVisible is true */}
        {isVisible && <About />}
      </section>
    </>
  );
};
