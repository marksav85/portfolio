import React from "react";
import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";

// eslint-disable-next-line react/prop-types
export const Header = ({ isEnglish, setLanguage }) => {
  const lang = isEnglish ? english : german;

  return (
    <>
      <header id="header">
        <div className="lang-toggle">
          <button onClick={setLanguage}>
            {isEnglish ? (
              <img src="images/english.jpg" alt="british flag"></img>
            ) : (
              <img src="images/deutsch.jpg" alt="german flag"></img>
            )}
          </button>
          <p>{lang.headerSection.buttonText}</p>
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
                  className="icon brands fa-twitter"
                  aria-label="Link to Twitter"
                >
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
