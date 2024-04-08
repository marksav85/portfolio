import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";

import { GB } from "country-flag-icons/react/3x2";
import { DE } from "country-flag-icons/react/3x2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

// Import language-related context and custom hook
import { useLanguage } from "../../context/LanguageContext";
import useLanguageContent from "../../hooks/useLanguageContent";

// eslint-disable-next-line react/prop-types
export const Header = ({ isEnglish, setLanguage }) => {
  const lang = isEnglish ? english : german;

  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();

  return (
    <>
      <header id="header">
        <div className="lang-toggle">
          {/* <button onClick={setLanguage}>
            {isEnglish ? (
              <GB title="English" className="flags" />
            ) : (
              <DE title="German" className="flags" />
            )}
          </button>
          <p>{lang.headerSection.buttonText}</p> */}
          <button onClick={handleLanguageChange}>
            {/* Display language navigation button text or DE if content not loaded*/}
            {language && language.navigation.buttonText === "EN"
              ? <GB title="English" className="flags" /> || "EN"
              : language && language.navigation.buttonText === "DE"
              ? <DE title="German" className="flags" /> || "DE"
              : language && language.navigation.buttonText}
          </button>
        </div>
        <br />

        <div className="inner">
          <a href="#" className="image avatar">
            <img src="images/headshot.jpg" alt="headshot"></img>
          </a>
          <h1>
            {lang.headerSection.line1}
            <strong>{lang.headerSection.name}</strong>
            {lang.headerSection.line2}
            <br />
            {lang.headerSection.line3} <br /> {lang.headerSection.line4}
            <strong>{lang.headerSection.codeLang}</strong> .
          </h1>
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
