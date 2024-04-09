import React from "react";
import * as english from "../../../../languages/en.json";
import * as german from "../../../../languages/de.json";

// Import language-related context and custom hook
import { useLanguage } from "../../../../context/LanguageContext";
import useLanguageContent from "../../../../hooks/useLanguageContent";

export const About = ({ isEnglish }) => {
  // Use language-related context and custom hook
  const { handleLanguageChange } = useLanguage();
  const language = useLanguageContent();
  const baseUrl = "http://localhost:1337";
  console.log(language);

  // const lang = isEnglish ? english : german;
  // const skillsData = [
  //   {
  //     name: "HTML5",

  //     image: "images/aboutme-icons/html5.png",
  //     expertise: "5/5",
  //   },
  //   { name: "CSS", image: "images/aboutme-icons/css.png", expertise: "5/5" },
  //   {
  //     name: "JavaScript",
  //     image: "images/aboutme-icons/javascript4.png",
  //     expertise: "4/5",
  //   },
  //   {
  //     name: "React",
  //     image: "images/aboutme-icons/react.png",
  //     expertise: "4/5",
  //   },
  //   {
  //     name: "Angular",
  //     image: "images/aboutme-icons/angular.png",
  //     expertise: "3/5",
  //   },
  //   {
  //     name: "TypeScript",
  //     image: "images/aboutme-icons/typescript.png",
  //     expertise: "3/5",
  //   },
  //   {
  //     name: "Node.js",
  //     image: "images/aboutme-icons/node.png",
  //     expertise: "3/5",
  //   },
  //   {
  //     name: "MongoDB",
  //     image: "images/aboutme-icons/mongodb.png",
  //     expertise: "3/5",
  //   },
  //   {
  //     name: "MySQL",
  //     image: "images/aboutme-icons/mysql.png",
  //     expertise: "3/5",
  //   },
  //   {
  //     name: "Firebase",
  //     image: "images/aboutme-icons/firebase.png",
  //     expertise: "3/5",
  //   },
  //   { name: "AWS", image: "images/aboutme-icons/aws.png", expertise: "3/5" },
  // ];

  return (
    <>
      <div className="skills-table-container">
        <h2>{language && language.profile && language.profile.skillsTitle}</h2>
        <table className="skills-table">
          <thead>
            <tr>
              <th>
                {language && language.profile && language.profile.tableTech}
              </th>
              <th></th>
              <th>
                {language &&
                  language.profile &&
                  language.profile.tableExpertise}
              </th>
            </tr>
          </thead>
          <tbody>
            {language &&
              language.skillsTables &&
              language.skillsTables.map((skill, index) => (
                <tr key={index}>
                  <td>{skill.attributes.Column1}</td>
                  <td>
                    <img
                      src={
                        baseUrl + skill.attributes.Column2.data.attributes.url
                      }
                      alt={
                        skill.attributes.Column2.data.attributes.alternativeText
                      }
                    />
                  </td>
                  <td>{`${skill.attributes.Column3}/5`}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
