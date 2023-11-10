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
        </div>

        <ul className="actions">
          <li></li>
        </ul>
      </section>
    </>
  );
};
