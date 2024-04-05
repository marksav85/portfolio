import { useState } from "react";
import * as english from "../../../languages/en.json";
import * as german from "../../../languages/de.json";
import { SingleProject } from "./single-project/single-project";
import AdditionalProjects from "./additional-projects/AdditionalProjects";

export const Work = ({ isEnglish }) => {
  const lang = isEnglish ? english : german;

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const workArray = [
    {
      title: "Language Coach App",
      image1: "project1/image1.jpg",
      image2: "project1/image2.jpg",
      image3: "project1/image3.jpg",
      projectData: {
        introText: `${lang.project1.introText}`,
        para1: `${lang.project1.para1}`,
        para2: `${lang.project1.para2}`,
        para3: `${lang.project1.para3}`,
        para4: `${lang.project1.para4}`,
        technologies: `${lang.project1.technologies}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        processTitle: `${lang.projectLabels.processTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
      },
      links: {
        site: "https://language-coach-aa.com/",
        repo: "https://github.com/marksav85/language-coach-aa",
      },
    },

    {
      title: "Movie API",
      image1: "project2/image1.jpg",
      image2: "project2/image2.jpg",
      image3: "project2/image3.jpg",
      projectData: {
        introText: `${lang.project2.introText}`,
        para1: `${lang.project2.para1}`,
        para2: `${lang.project2.para2}`,
        para3: `${lang.project2.para3}`,
        para4: `${lang.project2.para4}`,
        technologies: `${lang.project2.technologies}`,
        site: `${lang.project2.visitSite}`,
        repo: `${lang.project2.visitRepo}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        processTitle: `${lang.projectLabels.processTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
      },
      links: {
        site: "https://github.com/marksav85/movie-api",
        repo: "https://github.com/marksav85/movie-api",
      },
    },
    {
      title: "MyFlix Movies",
      image1: "project3/image1.jpg",
      image2: "project3/image2.jpg",
      image3: "project3/image3.jpg",
      projectData: {
        introText: `${lang.project3.introText}`,
        para1: `${lang.project3.para1}`,
        para2: `${lang.project3.para2}`,
        para3: `${lang.project3.para3}`,
        para4: `${lang.project3.para4}`,
        technologies: `${lang.project3.technologies}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        processTitle: `${lang.projectLabels.processTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
      },
      links: {
        site: "https://my-flix-films.netlify.app/",
        repo: "https://github.com/marksav85/myFlix-client",
      },
    },
    {
      title: "Meet App",
      image1: "project4/image1.jpg",
      image2: "project4/image2.jpg",
      image3: "project4/image3.jpg",
      projectData: {
        introText: `${lang.project4.introText}`,
        para1: `${lang.project4.para1}`,
        para2: `${lang.project4.para2}`,
        para3: `${lang.project4.para3}`,
        para4: `${lang.project4.para4}`,
        technologies: `${lang.project4.technologies}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        processTitle: `${lang.projectLabels.processTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
      },
      links: {
        site: "https://marksav85.github.io/meet",
        repo: "https://github.com/marksav85/meet",
      },
    },
    {
      title: "Chat App",
      image1: "project5/image1.jpg",
      image2: "project5/image2.jpg",
      image3: "project5/image3.jpg",
      projectData: {
        introText: `${lang.project5.introText}`,
        para1: `${lang.project5.para1}`,
        para2: `${lang.project5.para2}`,
        para3: `${lang.project5.para3}`,
        para4: `${lang.project5.para4}`,
        technologies: `${lang.project5.technologies}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        processTitle: `${lang.projectLabels.processTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
        noSite: `${lang.projectLabels.noSite}`,
      },
      links: {
        repo: "https://github.com/marksav85/chat-app",
      },
    },
    {
      title: "MyFlix Angular",
      image1: "project6/image1.jpg",
      image2: "project6/image2.jpg",
      image3: "project6/image3.jpg",
      projectData: {
        introText: `${lang.project6.introText}`,
        para1: `${lang.project6.para1}`,
        para2: `${lang.project6.para2}`,
        para3: `${lang.project6.para3}`,
        para4: `${lang.project6.para4}`,
        technologies: `${lang.project6.technologies}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        processTitle: `${lang.projectLabels.processTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
      },
      links: {
        site: "https://marksav85.github.io/myFlix-Angular-client/",
        repo: "https://github.com/marksav85/myFlix-Angular-client",
      },
    },
  ];

  return (
    <>
      <section id="two">
        <h2>{lang.workTitle.title}</h2>
        <div className="row">
          {workArray.map((workItem, index) => (
            <SingleProject
              key={index}
              title={workItem.title}
              image1={workItem.image1}
              image2={workItem.image2}
              image3={workItem.image3}
              projectData={workItem.projectData}
              projectLabels={workItem.projectLabels}
              links={workItem.links}
              isEnglish={isEnglish}
            />
          ))}
        </div>

        <ul className="actions add-projects">
          <li>
            <button onClick={toggleVisibility} className="button">
              {lang.workTitle.addTitle}
            </button>
          </li>
        </ul>
        {isVisible && <AdditionalProjects isEnglish={isEnglish} />}
      </section>
    </>
  );
};
