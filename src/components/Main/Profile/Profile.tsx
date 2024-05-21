import { useState } from "react";
import { About } from "./About/About";

// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";

// TypeScript interface for Profile component props
interface ProfileProps {
  initialVisibility?: boolean; // Initial visibility of the "About" section
}

export const Profile: React.FC<ProfileProps> = ({
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

  return (
    <>
      {/* Profile section */}
      <section id="one">
        {/* Profile title */}
        <header className="major">
          <h2>{language?.profile?.Title}</h2>
        </header>
        {/* Profile text */}
        <p>{language?.profile?.Text}</p>
        {/* Button to toggle visibility of "About" section */}
        <ul className="actions">
          <li>
            <button onClick={toggleVisibility} className="button">
              {/* Display button text based on visibility state */}
              {isVisible
                ? language?.profile?.buttonHide // Text to showw/hide the "About" section
                : language?.profile?.buttonShow}
            </button>
          </li>
        </ul>
        {/* Render "About" section if isVisible is true */}
        {isVisible && <About />}
      </section>
    </>
  );
};
