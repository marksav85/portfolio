import React from "react";
import * as english from "../../../languages/en.json";
import * as german from "../../../languages/de.json";

export const Contact = ({ isEnglish }) => {
  const lang = isEnglish ? english : german;

  return (
    <>
      <section id="three">
        <h2>{lang.contactSection.title}</h2>
        <p>{lang.contactSection.text}</p>
        <div className="row">
          <div className="col-4 col-12-small">
            <ul className="labeled-icons">
              <li>
                <h3 className="icon brands fa-linkedin">
                  <span className="label">Address</span>
                </h3>
                <a href="https://linkedin.com/in/mark-saville">
                  <span className="label">Linkedin</span>
                </a>
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
              <li>
                <h3 className="icon solid fa-download">
                  <span className="label">Download</span>
                </h3>
                <a href="documents/Saville-Mark-Resume.docx">Download my CV</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};