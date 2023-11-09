import React from "react";
import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";

export const Profile = () => {
  const [isEnglish, setIsEnglish] = React.useState(true);
  const lang = isEnglish ? english : german;

  return (
    <>
      <section id="one">
        <header className="major">
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="lang-toggle-button"
          >
            {isEnglish ? (
              <img src="/images/english.png" alt="headshot"></img>
            ) : (
              <img src="/images/deutsch.png" alt="headshot"></img>
            )}
          </button>
          <h2>{lang.profileSection.line1}</h2>
        </header>
        <p>{lang.profileSection.line2}</p>
        <ul className="actions">
          <li>
            <a href="#" className="button">
              Learn More
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};
