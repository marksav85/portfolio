import { useState } from "react";
import * as english from "../../../../languages/en.json";
import * as german from "../../../../languages/de.json";
import { SingleProject } from "../single-project/single-project";

export default function AdditionalProjects({ isEnglish }) {
  const lang = isEnglish ? english : german;

  const workArray = [
    {
      title: "title",
      image1: "image1",
      image2: "image2",
      image3: "image3",
      projectData: {
        introText: "introText",
        para1: "para1",
        para2: "para2",
        para3: "para3",
        para4: "para4",
        technologies: "technologies",
      },
      projectLabels: {
        introTitle: "introintroTitleText",
        processTitle: "processTitle",
        technologies: "technologies",
        site: "site",
        repo: "repo",
      },
      links: {
        site: "https://marksav85.github.io/pokedex-app/",
        repo: "https://github.com/marksav85/pokedex-app",
      },
    },
    {
      title: "title",
      image1: "image1",
      image2: "image2",
      image3: "image3",
      projectData: {
        introText: "introText",
        para1: "para1",
        para2: "para2",
        para3: "para3",
        para4: "para4",
        technologies: "technologies",
      },
      projectLabels: {
        introTitle: "introintroTitleText",
        processTitle: "processTitle",
        technologies: "technologies",
        site: "site",
        repo: "repo",
      },
      links: {
        site: "https://marksav85.github.io/pokedex-app/",
        repo: "https://github.com/marksav85/pokedex-app",
      },
    },
  ];

  return (
    <>
      <section id="two">
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
