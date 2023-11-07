import React from "react";
import { SingleProject } from "../single-project/single-project";
export const Work = () => {
  return (
    <>
      <section id="two">
        <h2>Recent Work</h2>
        <div className="row">
          <SingleProject
            title="Magna sed consequat tempus"
            description="Lorem ipsum dolor sit amet nisl sed nullam feugiat."
            image="/images/thumbs/01.jpg"
          />
          <SingleProject
            title="Ultricies lacinia interdum"
            description="Lorem ipsum dolor sit amet nisl sed nullam feugiat."
            image="/images/thumbs/02.jpg"
          />
          <SingleProject
            title="Tortor metus commodo"
            description="Lorem ipsum dolor sit amet nisl sed nullam feugiat."
            image="/images/thumbs/03.jpg"
          />
          <SingleProject
            title="Quam neque phasellus"
            description="Lorem ipsum dolor sit amet nisl sed nullam feugiat."
            image="/images/thumbs/04.jpg"
          />
          <SingleProject
            title="Nunc enim commodo aliquet"
            description="Lorem ipsum dolor sit amet nisl sed nullam feugiat."
            image="/images/thumbs/05.jpg"
          />
          <SingleProject
            title="Risus ornare lacinia"
            description="Lorem ipsum dolor sit amet nisl sed nullam feugiat."
            image="/images/thumbs/06.jpg"
          />
        </div>

        {/* <article className="col-6 col-12-xsmall work-item">
            <a
              href="/portfolio/public/images/fulls/02.jpg"
              className="image fit thumb"
              style={imageStyle}
            >
              <img src="/images/thumbs/02.jpg" alt="project two image"></img>
            </a>
            <h3>Ultricies lacinia interdum</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article className="col-6 col-12-xsmall work-item">
            <a
              href="/portfolio/public/images/fulls/03.jpg"
              className="image fit thumb"
              style={imageStyle}
            >
              <img src="/images/thumbs/03.jpg" alt="project three image"></img>
            </a>
            <h3>Tortor metus commodo</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article className="col-6 col-12-xsmall work-item">
            <a
              href="/portfolio/public/images/fulls/04.jpg"
              className="image fit thumb"
              style={imageStyle}
            >
              <img src="/images/thumbs/04.jpg" alt="project four image"></img>
            </a>
            <h3>Quam neque phasellus</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article className="col-6 col-12-xsmall work-item">
            <a
              href="/portfolio/public/images/fulls/05.jpg"
              className="image fit thumb"
              style={imageStyle}
            >
              <img src="/images/thumbs/05.jpg" alt="project five image"></img>
            </a>
            <h3>Nunc enim commodo aliquet</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article className="col-6 col-12-xsmall work-item">
            <a
              href="/portfolio/public/images/fulls/06.jpg"
              className="image fit thumb"
              style={imageStyle}
            >
              <img src="/images/thumbs/06.jpg" alt="project six image"></img>
            </a>
            <h3>Risus ornare lacinia</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
        </div> */}
        <ul className="actions">
          <li>
            <a href="#" className="button">
              Full Portfolio
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};
