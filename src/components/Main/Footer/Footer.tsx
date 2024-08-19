import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <div>
      <footer id="footer" className="footer-bottom">
        <div className="inner">
          <ul className="icons">
            <li>
              <a
                href="https://twitter.com/marksav85"
                className="icon brands"
                aria-label="Link to Twitter"
              >
                <FontAwesomeIcon className="react-icon" icon={faXTwitter} />
                <span className="label">Twitter</span>
              </a>
            </li>
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
                aria-label="Link to Linkedin"
              >
                <FontAwesomeIcon className="react-icon" icon={faLinkedin} />
                <span className="label">Linkedin</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:marksav85@gmail.com?subject=Test%20test&body=This%20is%20a%20test"
                className="icon solid"
                aria-label="Send an email"
              >
                <FontAwesomeIcon className="react-icon" icon={faEnvelope} />
                <span className="label">Email</span>
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
