import React from "react";

export const Footer = () => {
  return (
    <div>
      <footer id="footer">
        <div className="inner">
          <ul className="icons">
            <li>
              <a href="#" className="icon brands fa-twitter">
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands fa-github">
                <span className="label">Github</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands fa-linkedin">
                <span className="label">Linkedin</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon solid fa-envelope">
                <span className="label">Email</span>
              </a>
            </li>
          </ul>
          <ul className="copyright">
            <li>© Untitled</li>
            <li>
              Design: <a href="https://html5up.net">HTML5 UP</a>
            </li>
            <li>
              Demo Images: <a href="http://unsplash.com">Unsplash</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
