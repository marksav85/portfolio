import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <div>
      <footer id="footer" className="footer-bottom">
        <div className="inner">
          <ul className="icons">
            <li>
              <a
                href="https://github.com/marksav85"
                className="icon brands"
                aria-label="Link to GitHub"
              >
                <FontAwesomeIcon className="react-icon" icon={faGithub} />
                <span className="label">Github</span>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/mark-saville"
                className="icon brands"
                aria-label="Link to LinkedIn"
              >
                <FontAwesomeIcon className="react-icon" icon={faLinkedin} />
                <span className="label">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="www.marksavilledesigns.com"
                className="icon solid"
                aria-label="Send an email"
              >
                <FontAwesomeIcon className="react-icon" icon={faGlobe} />
                <span className="label">Website</span>
              </a>
            </li>
          </ul>
          <ul className="copyright">
            <li></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
