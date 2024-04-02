import * as english from "../../../../languages/en.json";
import * as german from "../../../../languages/de.json";
import { AddSingleProject } from "../single-project/AddSingleProject";

export default function AdditionalProjects({ isEnglish }) {
  const lang = isEnglish ? english : german;

  const workArray = [
    {
      title: "Pokemon App",
      image1: "project7/image1.jpg",
      image2: "project7/image2.jpg",
      image3: "project7/image3.jpg",
      projectData: {
        introText: `${lang.project7.introText}`,
        para1: `${lang.project7.para1}`,
        para2: `${lang.project7.para2}`,
        para3: `${lang.project7.para3}`,
        para4: `${lang.project7.para4}`,
        technologies: `${lang.project7.technologies}`,
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
        introText: `${lang.project8.introText}`,
        para1: `${lang.project8.para1}`,
        para2: `${lang.project8.para2}`,
        para3: `${lang.project8.para3}`,
        para4: `${lang.project8.para4}`,
        technologies: `${lang.project8.technologies}`,
        site: `${lang.project8.visitSite}`,
        repo: `${lang.project8.visitRepo}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        descTitle: `${lang.projectLabels.descTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
      },
      links: {
        site: "https://my-travel-weather-app-997ff38afb18.herokuapp.com/",
        repo: "https://github.com/marksav85/travel_app",
      },
    },
    {
      title: "Restaurant Website",
      image1: "project9/image1.jpg",
      image2: "project9/image2.jpg",
      image3: "project9/image3.jpg",
      projectData: {
        introText: `${lang.project9.introText}`,
        para1: `${lang.project9.para1}`,
        para2: `${lang.project9.para2}`,
        para3: `${lang.project9.para3}`,
        para4: `${lang.project9.para4}`,
        technologies: `${lang.project9.technologies}`,
        site: `${lang.project9.visitSite}`,
        repo: `${lang.project9.visitRepo}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        descTitle: `${lang.projectLabels.descTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
      },
      links: {
        site: "https://marksav85.github.io/restaurant-website/",
        repo: "https://github.com/marksav85/restaurant-website",
      },
    },
    {
      title: "Bikeshare App",
      image1: "project10/image1.jpg",
      image2: "project10/image2.jpg",
      image3: "project10/image3.jpg",
      projectData: {
        introText: `${lang.project10.introText}`,
        para1: `${lang.project10.para1}`,
        para2: `${lang.project10.para2}`,
        para3: `${lang.project10.para3}`,
        para4: `${lang.project10.para4}`,
        technologies: `${lang.project10.technologies}`,
        site: `${lang.project10.visitSite}`,
        repo: `${lang.project10.visitRepo}`,
      },
      projectLabels: {
        introTitle: `${lang.projectLabels.introTitle}`,
        descTitle: `${lang.projectLabels.descTitle}`,
        technologies: `${lang.projectLabels.technologies}`,
        site: `${lang.projectLabels.visitSite}`,
        repo: `${lang.projectLabels.visitRepo}`,
        noSite: `${lang.projectLabels.noSite}`,
      },
      links: {
        repo: "https://github.com/marksav85/bikeshare_project",
      },
    },
  ];

  return (
    <>
      <section id="two">
        <div className="row">
          {workArray.map((workItem, index) => (
            <AddSingleProject
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
