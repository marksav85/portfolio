import React from "react";
import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";
import { SingleProject } from "../single-project/single-project";
import { ImageModal } from "../image-modal/image-modal";

export const Work = ({ isEnglish }) => {
  const lang = isEnglish ? english : german;

  const workArray = [
    {
      title: "Pokemon App",
      image: "project1.png",
      projectData: {
        introText: `${lang.project1.introText}`,
        para1: `${lang.project1.para1}`,
        para2: `${lang.project1.para2}`,
        para3: `${lang.project1.para3}`,
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
        site: "https://marksav85.github.io/pokedex-app/",
        repo: "https://github.com/marksav85/pokedex-app",
      },
    },

    {
      title: "Movie API",
      image: "project2.png",
      projectData: {
        introText: `${lang.project2.introText}`,
        para1: `${lang.project2.para1}`,
        para2: `${lang.project2.para2}`,
        para3: `${lang.project2.para3}`,
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
      image: "project3.png",
      projectData: {
        introText: `${lang.project3.introText}`,
        para1: `${lang.project3.para1}`,
        para2: `${lang.project3.para2}`,
        para3: `${lang.project3.para3}`,
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
      image: "project4.png",
      projectData: {
        introText: `${lang.project4.introText}`,
        para1: `${lang.project4.para1}`,
        para2: `${lang.project4.para2}`,
        para3: `${lang.project4.para3}`,
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
      image: "project5.png",
      projectData: {
        introText: `${lang.project5.introText}`,
        para1: `${lang.project5.para1}`,
        para2: `${lang.project5.para2}`,
        para3: `${lang.project5.para3}`,
        technologies: `${lang.project5.technologies}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        processTitle: `${lang.projectLabels.processTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
      },
      links: {
        site: "https://github.com/marksav85/chat-app",
        repo: "https://github.com/marksav85/chat-app",
      },
    },
    {
      title: "MyFlix Angular",
      image: "project6.png",
      projectData: {
        introText: `${lang.project6.introText}`,
        para1: `${lang.project6.para1}`,
        para2: `${lang.project6.para2}`,
        para3: `${lang.project6.para3}`,
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
              image={workItem.image}
              projectData={workItem.projectData}
              projectLabels={workItem.projectLabels}
              links={workItem.links}
              isEnglish={isEnglish}
            />
          ))}
        </div>

        <ul className="actions">
          <li></li>
        </ul>
      </section>
    </>
  );
};
