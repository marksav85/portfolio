import { useState } from "react";
import { About } from "./About/About";

// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";

export const Profile = () => {
  // State to manage visibility of the "About" section
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility of the "About" section
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
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
