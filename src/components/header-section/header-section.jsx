import React from "react";
import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";

export const Header = () => {
  const [isEnglish, setIsEnglish] = React.useState(true);
  const lang = isEnglish ? english : german;

  return (
    <>
      <header id="header">
        <button
          onClick={() => setIsEnglish(!isEnglish)}
          className="button button-primary"
        >
          {isEnglish ? "English" : "Deutsch"}
        </button>

        <div className="inner">
          <a href="#" className="image-avatar">
            <img src="" alt=""></img>
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
        <footer id="footer">
          <div className="inner">
            <ul className="icons">
              <li>
                <a href="#" className="icon brands fa-twitter">
                  <span className="label">Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon brands fa-github">
                  <span className="label">Github</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon brands fa-linkedin">
                  <span className="label">Linkedin</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon solid fa-envelope">
                  <span className="label">Email</span>
                </a>
              </li>
            </ul>
            <ul className="copyright">
              <li>© Untitled</li>
              <li>
                Design: <a href="https://html5up.net">HTML5 UP</a>
              </li>
              <li>
                Demo Images: <a href="http://unsplash.com">Unsplash</a>
              </li>
            </ul>
          </div>
        </footer>
      </header>
    </>
  );
};
