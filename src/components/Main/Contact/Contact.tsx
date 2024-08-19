import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMobileScreen,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";

export const Contact: React.FC = () => {
  // Use language-related context and custom hook to access language content
  const language = useLanguageContent();

  // Base URL for resume links
  // const { baseUrl } = useLanguage();

  // Construct URLs for developer and full resumes
  const resumeDevUrl = language?.contact?.ResumeDeveloperLink;
  // const resumeFullUrl = language?.contact?.ResumeFullLink;

  return (
    <>
      {/* Contact section */}
      <section id="three">
        {/* Contact title */}
        <h2>{language?.contact?.Title}</h2>
        {/* Contact subtitle */}
        <p>{language?.contact?.Subtitle}</p>
        <div className="row">
          <div className="col-4 col-12-small">
            {/* List of contact information */}
            <ul className="labeled-icons">
              <li>
                {/* Linkedin */}
                <h3 className="icon brands">
                  <FontAwesomeIcon className="react-icon" icon={faLinkedin} />
                </h3>
                {/* Display Linkedin link */}
                <a
                  href="https://linkedin.com/in/mark-saville"
                  aria-label="Link to Linedkin"
                >
                  <span className="label">{language?.contact?.Linkedin}</span>
                </a>
              </li>
              <li>
                {/* Phone */}
                <h3 className="icon solid" aria-label="My telephone number">
                  <FontAwesomeIcon
                    className="react-icon"
                    icon={faMobileScreen}
                  />
                </h3>
                {/* Display telephone number */}
                {language?.contact?.Telephone}
              </li>
              <li>
                {/* Email */}
                <h3 className="icon solid">
                  <FontAwesomeIcon className="react-icon" icon={faEnvelope} />
                </h3>
                {/* Display email address */}
                <a
                  href="mailto:mark.saville@outlook.com"
                  aria-label="Send an email"
                >
                  {language?.contact?.Email}
                </a>
              </li>
            </ul>

            {/* List of resume download links */}
            {/* <ul className="labeled-icons">
              <li>
                <h3 className="icon solid">
                  <FontAwesomeIcon icon={faDownload} />
                </h3>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={resumeDevUrl}
                  aria-label={language?.contact?.ResumeDeveloperText}
                  download
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
                  download
                >
                  {language?.contact?.ResumeFullText}
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </section>
    </>
  );
};
