import React from "react";
import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";

export const Contact = () => {
  const [isEnglish, setIsEnglish] = React.useState(true);
  const lang = isEnglish ? english : german;

  return (
    <>
      <section id="three">
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
        <h2>{lang.contactSection.title}</h2>
        <p>{lang.contactSection.text}</p>
        <div className="row">
          <div className="col-4 col-12-small">
            <ul className="labeled-icons">
              <li>
                <h3 className="icon solid fa-home">
                  <span className="label">Address</span>
                </h3>
                1234 Somewhere Rd.
                <br />
                Magdeburg, 39104
                <br />
                Germany
              </li>
              <li>
                <h3 className="icon solid fa-mobile-alt">
                  <span className="label">Phone</span>
                </h3>
                +49176 4710 7960
              </li>
              <li>
                <h3 className="icon solid fa-envelope">
                  <span className="label">Email</span>
                </h3>
                <a href="mailto:marksav85@gmail.com?subject=Test%20test&body=This%20is%20a%20test">
                  marksav85@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
