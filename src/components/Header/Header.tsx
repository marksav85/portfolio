import React from "react";
// Import flags and icons
import { GB } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// Import Skeleton loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Optional: to include default skeleton styles

// Import language-related context and custom hook
import { useGetLanguages } from "../../hooks/useGetLanguages";
import { useLanguage } from "../../context/LanguageContext";
import useLanguageContent from "../../hooks/useLanguageContent";

// TypeScript interfaces
interface Child {
  bold: boolean;
  text: string;
}

interface Paragraph {
  children: Child[];
}

interface Language {
  header: {
    Button: string;
    Text: Paragraph[];
  };
}

export const Header = () => {
  // Accessing language change handler from context
  const { handleLanguageChange } = useLanguage();
  // Getting language content using custom hook
  const language = useLanguageContent() as Language;
  const { loading, error } = useGetLanguages();

  return (
    <>
      <header id="header">
        <div className="lang-toggle">
          <button onClick={handleLanguageChange}>
            {/* Display skeleton or language button */}
            {loading ? (
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
              {loading ? (
                <Skeleton circle={true} height={150} width={150} />
              ) : (
                <img src="images/headshot.jpg" alt="headshot"></img>
              )}
            </a>
          </div>
          <div>
            {/* Displaying header text */}
            {loading ? (
              <Skeleton count={3} />
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
              <li>
                {loading ? (
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
              </li>
              <li>
                {loading ? (
                  <Skeleton width={24} height={24} circle={true} />
                ) : (
                  <a
                    href="https://github.com/marksav85"
                    className="icon brands"
                    aria-label="Link to GitHub"
                  >
                    <FontAwesomeIcon className="react-icon" icon={faGithub} />
                  </a>
                )}
              </li>
              <li>
                {loading ? (
                  <Skeleton width={24} height={24} circle={true} />
                ) : (
                  <a
                    href="https://linkedin.com/in/mark-saville"
                    className="icon brands"
                    aria-label="Link to Linkedin"
                  >
                    <FontAwesomeIcon className="react-icon" icon={faLinkedin} />
                  </a>
                )}
              </li>
              <li>
                {loading ? (
                  <Skeleton width={24} height={24} circle={true} />
                ) : (
                  <a
                    href="mailto:mark.saville@outlook.com"
                    className="icon solid"
                    aria-label="Send an email"
                  >
                    <FontAwesomeIcon className="react-icon" icon={faEnvelope} />
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
