import React from "react";

export const Header = () => {
  return (
    <>
      <header id="header" style="background-position: left 0px;">
        <div className="inner">
          <a href="#" className="image-avatar">
            <img src="" alt=""></img>
          </a>
          <h1>
            <strong>I am Strata</strong>, a super simple
            <br />
            responsive site template freebie
            <br />
            crafted by <a href="">HTML5 UP</a>.
          </h1>
        </div>
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
                <a href="#" className="icon brands fa-dribbble">
                  <span className="label">Dribbble</span>
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
      </header>
    </>
  );
};

export default Header;
