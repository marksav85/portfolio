import React from "react";

export const Footer = () => {
  return (
    <div>
      <footer id="footer" className="footer-bottom">
        <div className="inner">
          <ul className="icons">
            <li>
              <a
                href="https://twitter.com/marksav85"
                className="icon brands fa-twitter"
                aria-label="Link to Twitter"
              >
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/marksav85"
                className="icon brands fa-github"
                aria-label="Link to GitHub"
              >
                <span className="label">Github</span>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/mark-saville"
                className="icon brands fa-linkedin"
                aria-label="Link to Linkedin"
              >
                <span className="label">Linkedin</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:marksav85@gmail.com?subject=Test%20test&body=This%20is%20a%20test"
                className="icon solid fa-envelope"
                aria-label="Send an email"
              >
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
