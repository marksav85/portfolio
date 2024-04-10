import React from "react";
import * as english from "../../../languages/en.json";
import * as german from "../../../languages/de.json";

// Import language-related context and custom hook
import { useLanguage } from "../../../context/LanguageContext";
import useLanguageContent from "../../../hooks/useLanguageContent";

export const Contact = ({ isEnglish }) => {
  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();

  const baseUrl = "http://localhost:1337";
  const resumeDevUrl =
    baseUrl + language?.contact?.ResumeDeveloperLink?.data?.attributes?.url;
  const resumeFullUrl =
    baseUrl + language?.contact?.ResumeFullLink?.data?.attributes?.url;

  return (
    <>
      <section id="three">
        <h2>{language?.contact?.Title}</h2>
        <p>{language?.contact?.Subtitle}</p>
        <div className="row">
          <div className="col-4 col-12-small">
            <ul className="labeled-icons">
              <li>
                <h3 className="icon brands fa-linkedin">
                  <span className="label">Linkedin Address</span>
                </h3>
                <a
                  href="https://linkedin.com/in/mark-saville"
                  aria-label="Link to Linedkin"
                >
                  <span className="label">{language?.contact?.Linkedin}</span>
                </a>
              </li>
              <li>
                <h3
                  className="icon solid fa-mobile-alt"
                  aria-label="My telephone number"
                >
                  <span className="label">Phone</span>
                </h3>
                {language?.contact?.Telephone}
              </li>
              <li>
                <h3 className="icon solid fa-envelope">
                  <span className="label">Email</span>
                </h3>
                <a
                  href="mailto:mark.saville@outlook.com"
                  aria-label="Send an email"
                >
                  {language?.contact?.Email}
                </a>
              </li>
            </ul>

            <ul className="labeled-icons">
              <li>
                <h3 className="icon solid fa-download">
                  <span className="label">Download</span>
                </h3>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={resumeDevUrl}
                  aria-label={language?.contact?.ResumeDeveloperText}
                >
                  {language?.contact?.ResumeDeveloperText}
                </a>
              </li>
              <li>
                <h3 className="icon solid fa-download">
                  <span className="label">Download</span>
                </h3>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={resumeFullUrl}
                  aria-label={language?.contact?.ResumeFullText}
                >
                  {language?.contact?.ResumeFullText}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
