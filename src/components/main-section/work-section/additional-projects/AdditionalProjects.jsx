import { useState } from "react";
import * as english from "../../../../languages/en.json";
import * as german from "../../../../languages/de.json";
import { SingleProject } from "../single-project/single-project";

export default function AdditionalProjects({ isEnglish }) {
  const lang = isEnglish ? english : german;

  const workArray = [
    {
      title: "My Dojo",
      image1: "project7/image1.jpg",
      image2: "project7/image2.jpg",
      image3: "project7/image3.jpg",
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
        site: "https://marksav85.github.io/pokedex-app/",
        repo: "https://github.com/marksav85/pokedex-app",
      },
    },
    {
      title: "Travel App",
      image1: "project8/image1.jpg",
      image2: "project8/image2.jpg",
      image3: "project8/image3.jpg",
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
      </section>
    </>
  );
}
