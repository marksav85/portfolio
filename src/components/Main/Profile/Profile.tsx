import { useState } from "react";
import { About } from "./About/About";
// Import Skeleton loader
import Skeleton from "react-loading-skeleton";

// Import language-related context and custom hook
import { useGetLanguages } from "../../../hooks/useGetLanguages";
import { useLanguage } from "../../../context/LanguageContext";

export const Profile: React.FC = () => {
  // State to manage visibility of the "About" section
  const [isVisible, setIsVisible] = useState(false);
  const { handleLanguageChange, selectedLanguage } = useLanguage();

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
        <div
          className="profile-language-switcher"
          role="group"
          aria-label="Language selection"
        >
          <button
            type="button"
            aria-current={selectedLanguage === "english" ? "true" : undefined}
            aria-label="Switch language to English"
            disabled={selectedLanguage === "english"}
            onClick={handleLanguageChange}
          >
            EN
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            aria-current={selectedLanguage === "german" ? "true" : undefined}
            aria-label="Switch language to German"
            disabled={selectedLanguage === "german"}
            onClick={handleLanguageChange}
          >
            DE
          </button>
        </div>

        <div className="profile-intro">
          <img
            className="profile-intro-image"
            src="/images/profile/profile-photo.webp"
            alt="Profile portrait"
            width={960}
            height={1200}
          />

          <div className="profile-intro-heading">
            <header className="major">
              {isInitialLoading ? (
                <Skeleton width={200} height={48} />
              ) : (
                <h2>{language?.profile?.Title}</h2>
              )}
            </header>
          </div>
        </div>

        <div className="profile-intro-body">
          <p>
            {isInitialLoading ? (
              <Skeleton count={10} />
            ) : (
              language?.profile?.Text
            )}
          </p>

          <ul className="actions">
            <li>
              {isInitialLoading ? (
                <Skeleton width={100} height={50} />
              ) : (
                <button
                  onClick={toggleVisibility}
                  className="button"
                  aria-expanded={isVisible}
                >
                  {isVisible
                    ? language?.profile?.buttonHide
                    : language?.profile?.buttonShow}
                </button>
              )}
            </li>
          </ul>
        </div>

        {isVisible && <About />}
      </section>
    </>
  );
};
