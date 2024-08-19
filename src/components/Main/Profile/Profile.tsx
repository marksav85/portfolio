import { useState } from "react";
import { About } from "./About/About";
// Import Skeleton loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Optional: to include default skeleton styles

// Import language-related context and custom hook
import { useGetLanguages } from "../../../hooks/useGetLanguages";
import useLanguageContent from "../../../hooks/useLanguageContent";

// TypeScript interface for About section visibilty toggle
interface toggleVisibility {
  initialVisibility?: boolean; // Initial visibility of the "About" section
}

export const Profile: React.FC<toggleVisibility> = ({
  initialVisibility = false,
}) => {
  // State to manage visibility of the "About" section
  const [isVisible, setIsVisible] = useState<boolean>(initialVisibility);

  // Function to toggle visibility of the "About" section
  const toggleVisibility: () => void = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

  // Use language-related context and custom hook to access language content
  const language = useLanguageContent();
  // Use custom hook to fetch loading state
  const { loading } = useGetLanguages();

  return (
    <>
      {/* Profile section */}
      <section id="one">
        {/* Profile title */}
        <header className="major">
          {loading ? (
            <Skeleton width={200} height={100} />
          ) : (
            <h2>{language?.profile?.Title}</h2>
          )}
        </header>

        {/* Profile text */}
        <p>{loading ? <Skeleton count={10} /> : language?.profile?.Text}</p>

        {/* Button to toggle visibility of "About" section */}
        <ul className="actions">
          <li>
            {loading ? (
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
