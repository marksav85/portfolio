import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
// Import language-related context and custom hook
import useLanguageContent from "../../../hooks/useLanguageContent";

export const Contact: React.FC = () => {
  // Use language-related context and custom hook to access language content
  const language = useLanguageContent();

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
                <span className="icon brands contact-icon">
                  <FontAwesomeIcon className="react-icon" icon={faLinkedin} />
                </span>
                {/* Display Linkedin link */}
                <a
                  href="https://linkedin.com/in/mark-saville"
                  aria-label="Link to LinkedIn"
                >
                  <span className="label">{language?.contact?.Linkedin}</span>
                </a>
              </li>
              <li>
                <span className="icon solid contact-icon">
                  <FontAwesomeIcon className="react-icon" icon={faGlobe} />
                </span>

                <a
                  href="https://marksavilledesigns.com"
                  aria-label="Visit Mark Saville Designs website"
                >
                  {language?.contact?.Email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
