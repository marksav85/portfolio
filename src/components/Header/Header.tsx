import React from "react";
// Import flags and icons
import { GB } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

// Import language-related context and custom hook
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

  return (
    <>
      <header id="header">
        <div className="lang-toggle">
          <button onClick={handleLanguageChange}>
            {/* Display language navigation button */}
            {
              language?.header?.Button === "DE" ? (
                <GB title="English" className="flags" />
              ) : language?.header?.Button === "EN" ? (
                <DE title="German" className="flags" />
              ) : (
                "DE"
              ) /* Fallback to "DE" if header content not loaded */
            }
          </button>
        </div>
        <br />

        {/* Main Section */}
        <div className="inner">
          {/* Displaying headshot image */}
          <a href="#" className="image avatar">
            <img src="images/headshot.jpg" alt="headshot"></img>
          </a>

          {/* Displaying header text */}
          {Array.isArray(language?.header?.Text) && ( // Type check that .map property is array or object
            <>
              {language.header?.Text && (
                <h1>
                  {language.header.Text.map((paragraph, index) => (
                    <React.Fragment key={index}>
                      {paragraph.children.map((child, childIndex) => (
                        <span
                          key={childIndex}
                          style={
                            child.bold
                              ? { fontWeight: "400", color: "#fff" }
                              : undefined
                          }
                        >
                          {child.text}
                        </span>
                      ))}
                    </React.Fragment>
                  ))}
                </h1>
              )}
            </>
          )}
        </div>

        {/* Display footer links */}
        <footer id="footer" className="footer-top">
          <div className="inner">
            <ul className="icons">
              <li>
                <a
                  href="https://twitter.com/marksav85"
                  className="icon brands"
                  aria-label="Link to Twitter"
                >
                  <FontAwesomeIcon className="react-icon" icon={faXTwitter} />
                  <span className="label">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/marksav85"
                  className="icon brands fa-github"
                  aria-label="Link to GitHub"
                >
                  <span className="label">Github</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/mark-saville"
                  className="icon brands fa-linkedin"
                  aria-label="Link to Linkedin"
                >
                  <span className="label">Linkedin</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mark.saville@outlook.com"
                  className="icon solid fa-envelope"
                  aria-label="Send an email"
                >
                  <span className="label">Email</span>
                </a>
              </li>
            </ul>
            <ul className="copyright">
              <li>
                {/* Design: <a href="https://html5up.net">HTML5 UP</a> */}
              </li>
            </ul>
          </div>
        </footer>
      </header>
    </>
  );
};
