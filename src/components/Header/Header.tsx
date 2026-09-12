import React from "react";
// Import flags and icons
import { GB } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// Import Skeleton loader
import Skeleton from "react-loading-skeleton";

// Import language-related context and custom hook
import { useGetLanguages } from "../../hooks/useGetLanguages";
import { useLanguage } from "../../context/LanguageContext";

export const Header = () => {
  // Accessing language change handler from context
  const { handleLanguageChange } = useLanguage();
  // Read the shared content and loading state together.
  const { data, loading } = useGetLanguages();
  const language = data;
  const isInitialLoading = loading && data === null;

  return (
    <>
      <header id="header">
        <div className="lang-toggle">
          <button onClick={handleLanguageChange}>
            {/* Display skeleton or language button */}
            {isInitialLoading ? (
              <Skeleton width={40} height={28} />
            ) : language?.header?.Button === "DE" ? (
              <GB title="English" className="flags" />
            ) : language?.header?.Button === "EN" ? (
              <DE title="German" className="flags" />
            ) : (
              "DE"
            )}
          </button>
        </div>
        <br />

        {/* Main Section */}
        <div className="inner">
          {/* Displaying headshot image */}
          <div>
            <a href="#" className="image avatar">
              {isInitialLoading ? (
                <Skeleton circle={true} height={150} width={150} />
              ) : (
                <img
                  src="images/headshot.jpg"
                  alt="headshot"
                  width={150}
                  height={150}
                />
              )}
            </a>
          </div>
          <div>
            {/* Displaying header text */}
            {isInitialLoading ? (
              <Skeleton count={10} />
            ) : (
              Array.isArray(language?.header?.Text) && (
                <h1>
                  {language.header.Text.map((paragraph, index) => (
                    <React.Fragment key={index}>
                      {paragraph.children.map((child, childIndex) => (
                        <span
                          key={childIndex}
                          style={
                            child.bold
                              ? { fontWeight: "400", color: "#FFC0CB" }
                              : undefined
                          }
                        >
                          {child.text}
                        </span>
                      ))}
                    </React.Fragment>
                  ))}
                </h1>
              )
            )}
          </div>
        </div>

        {/* Display footer links */}
        <footer id="footer" className="footer-top">
          <div className="inner">
            <ul className="icons">
              {/* <li>
                {isInitialLoading ? (
                  <Skeleton width={24} height={24} circle={true} />
                ) : (
                  <a
                    href="https://twitter.com/marksav85"
                    className="icon brands"
                    aria-label="Link to Twitter"
                  >
                    <FontAwesomeIcon className="react-icon" icon={faXTwitter} />
                    <span className="label">Twitter</span>
                  </a>
                )}
              </li> */}
              <li>
                {isInitialLoading ? (
                  <Skeleton width={24} height={24} circle={true} />
                ) : (
                  <a
                    href="https://github.com/marksav85"
                    className="icon brands"
                    aria-label="Link to GitHub"
                  >
                    <FontAwesomeIcon className="react-icon" icon={faGithub} />
                    <span className="label">Github</span>
                  </a>
                )}
              </li>
              <li>
                {isInitialLoading ? (
                  <Skeleton width={24} height={24} circle={true} />
                ) : (
                  <a
                    href="https://linkedin.com/in/mark-saville"
                    className="icon brands"
                    aria-label="Link to Linkedin"
                  >
                    <FontAwesomeIcon className="react-icon" icon={faLinkedin} />
                    <span className="label">Linkedin</span>
                  </a>
                )}
              </li>
              <li>
                {isInitialLoading ? (
                  <Skeleton width={24} height={24} circle={true} />
                ) : (
                  <a
                    href="mailto:contact@marksavilledesigns.com"
                    className="icon solid"
                    aria-label="Send an email"
                  >
                    <FontAwesomeIcon className="react-icon" icon={faEnvelope} />
                    <span className="label">Email</span>
                  </a>
                )}
              </li>
            </ul>
          </div>
        </footer>
      </header>
    </>
  );
};
