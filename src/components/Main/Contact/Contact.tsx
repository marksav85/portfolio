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
                <h3 className="icon brands fa-linkedin">
                  <span className="label">Linkedin Address</span>
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
                <h3
                  className="icon solid fa-mobile-alt"
                  aria-label="My telephone number"
                >
                  <span className="label">Phone</span>
                </h3>
                {/* Display telephone number */}
                {language?.contact?.Telephone}
              </li>
              <li>
                {/* Email */}
                <h3 className="icon solid fa-envelope">
                  <span className="label">Email</span>
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
            <ul className="labeled-icons">
              <li>
                {/* Developer resume */}
                <h3 className="icon solid fa-download">
                  <span className="label">Download</span>
                </h3>
                {/* Display link to download developer resume */}
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
              {/* <li>
                
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
              </li> */}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
