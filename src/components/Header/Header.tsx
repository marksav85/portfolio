import React from "react";
// Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
// Import Skeleton loader
import Skeleton from "react-loading-skeleton";

// Import language-related context and custom hook
import { useGetLanguages } from "../../hooks/useGetLanguages";

export const Header = () => {
  // Read the shared content and loading state together.
  const { data, loading } = useGetLanguages();
  const language = data;
  const isInitialLoading = loading && data === null;

  return (
    <>
      <header id="header">
        {/* Main Section */}
        <div className="inner">
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
        <nav
          id="header-social-links"
          className="footer-top"
          aria-label="Social links"
        >
          <div className="inner">
            <ul className="icons">
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
                    aria-label="Link to LinkedIn"
                  >
                    <FontAwesomeIcon className="react-icon" icon={faLinkedin} />
                    <span className="label">LinkedIn</span>
                  </a>
                )}
              </li>
              <li>
                {isInitialLoading ? (
                  <Skeleton width={24} height={24} circle={true} />
                ) : (
                  <a
                    href="https://marksavilledesigns.com"
                    className="icon solid"
                    aria-label="Visit Mark Saville Designs website"
                  >
                    <FontAwesomeIcon className="react-icon" icon={faGlobe} />
                    <span className="label">Website</span>
                  </a>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};
