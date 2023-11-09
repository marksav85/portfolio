import React from "react";
import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";
import { SingleProject } from "../single-project/single-project";
export const Work = () => {
  const [isEnglish, setIsEnglish] = React.useState(true);
  const lang = isEnglish ? english : german;
  const workArray = [
    {
      title: "Pokemon App",
      image: "project1.png",
      description: {
        introTitle: `${lang.project1.introTitle}`,
        introText: `${lang.project1.introText}`,
        processTitle: `${lang.project1.processTitle}`,
        para1: `${lang.project1.para1}`,
        para2: `${lang.project1.para2}`,
        para3: `${lang.project1.para3}`,
      },
    },
    {
      title: "Pokemon App",
      image: "project1.png",
      description: {
        introTitle: `${lang.project1.introTitle}`,
        introText: `${lang.project1.introText}`,
        processTitle: `${lang.project1.processTitle}`,
        para1: `${lang.project1.para1}`,
        para2: `${lang.project1.para2}`,
        para3: `${lang.project1.para3}`,
      },
    },
    {
      title: "Pokemon App",
      image: "project1.png",
      description: {
        introTitle: `${lang.project1.introTitle}`,
        introText: `${lang.project1.introText}`,
        processTitle: `${lang.project1.processTitle}`,
        para1: `${lang.project1.para1}`,
        para2: `${lang.project1.para2}`,
        para3: `${lang.project1.para3}`,
      },
    },
    {
      title: "Pokemon App",
      image: "project1.png",
      description: {
        introTitle: `${lang.project1.introTitle}`,
        introText: `${lang.project1.introText}`,
        processTitle: `${lang.project1.processTitle}`,
        para1: `${lang.project1.para1}`,
        para2: `${lang.project1.para2}`,
        para3: `${lang.project1.para3}`,
      },
    },
    {
      title: "Pokemon App",
      image: "project1.png",
      description: {
        introTitle: `${lang.project1.introTitle}`,
        introText: `${lang.project1.introText}`,
        processTitle: `${lang.project1.processTitle}`,
        para1: `${lang.project1.para1}`,
        para2: `${lang.project1.para2}`,
        para3: `${lang.project1.para3}`,
      },
    },
    {
      title: "Pokemon App",
      image: "project1.png",
      description: {
        introTitle: `${lang.project1.introTitle}`,
        introText: `${lang.project1.introText}`,
        processTitle: `${lang.project1.processTitle}`,
        para1: `${lang.project1.para1}`,
        para2: `${lang.project1.para2}`,
        para3: `${lang.project1.para3}`,
      },
    },
  ];

  return (
    <>
      <section id="two">
        <button
          onClick={() => setIsEnglish(!isEnglish)}
          className="lang-toggle-button"
        >
          {isEnglish ? (
            <img src="/images/english.png" alt="headshot"></img>
          ) : (
            <img src="/images/deutsch.png" alt="headshot"></img>
          )}
        </button>
        <h2>Recent Work</h2>
        <div className="row">
          {workArray.map((workItem, index) => (
            <SingleProject
              key={index}
              title={workItem.title}
              description={workItem.description}
              image={workItem.image}
            />
          ))}

          {/* <SingleProject
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
          /> */}
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
