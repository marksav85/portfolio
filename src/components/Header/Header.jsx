import React from "react";
import { GB } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

// Import language-related context and custom hook
import { useLanguage } from "../../context/LanguageContext";
import useLanguageContent from "../../hooks/useLanguageContent";

// eslint-disable-next-line react/prop-types
export const Header = () => {
  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();

  return (
    <>
      <header id="header">
        <div className="lang-toggle">
          <button onClick={handleLanguageChange}>
            {/* Display language navigation button text or fallback to "EN" if content not loaded */}
            {
              language && language.header && language.header.Button === "EN" ? (
                <GB title="English" className="flags" />
              ) : language &&
                language.header &&
                language.header.Button === "DE" ? (
                <DE title="German" className="flags" />
              ) : (
                "EN"
              ) /* Fallback to "EN" if header content not loaded */
            }
          </button>
        </div>
        <br />

        <div className="inner">
          <a href="#" className="image avatar">
            <img src="images/headshot.jpg" alt="headshot"></img>
          </a>
          {language && language.header && language.header.Text && (
            <h1>
              {language.header.Text.map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph.children.map((child, childIndex) => (
                    <span
                      key={childIndex}
                      style={
                        child.bold ? { fontWeight: "400", color: "#fff" } : null
                      }
                    >
                      {child.text}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </h1>
          )}
        </div>
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
