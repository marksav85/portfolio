import React from "react";
import * as english from "../../../../languages/en.json";
import * as german from "../../../../languages/de.json";

export const About = ({ isEnglish }) => {
  const lang = isEnglish ? english : german;
  const skillsData = [
    {
      name: "HTML5",

      image: "images/aboutme-icons/html5.png",
      expertise: "5/5",
    },
    { name: "CSS", image: "images/aboutme-icons/css.png", expertise: "5/5" },
    {
      name: "JavaScript",
      image: "images/aboutme-icons/javascript4.png",
      expertise: "4/5",
    },
    {
      name: "React",
      image: "images/aboutme-icons/react.png",
      expertise: "4/5",
    },
    {
      name: "Angular",
      image: "images/aboutme-icons/angular.png",
      expertise: "3/5",
    },
    {
      name: "TypeScript",
      image: "images/aboutme-icons/typescript.png",
      expertise: "3/5",
    },
    {
      name: "Node.js",
      image: "images/aboutme-icons/node.png",
      expertise: "3/5",
    },
    {
      name: "MongoDB",
      image: "images/aboutme-icons/mongodb.png",
      expertise: "3/5",
    },
    {
      name: "MySQL",
      image: "images/aboutme-icons/mysql.png",
      expertise: "3/5",
    },
    {
      name: "Firebase",
      image: "images/aboutme-icons/firebase.png",
      expertise: "3/5",
    },
    { name: "AWS", image: "images/aboutme-icons/aws.png", expertise: "3/5" },
  ];

  return (
    <>
      <div className="skills-table-container">
        <h2>{lang.aboutSection.skillsHeader}</h2>
        <table className="skills-table">
          <thead>
            <tr>
              <th>{lang.aboutSection.techTableHeader}</th>
              <th></th>
              <th>{lang.aboutSection.expertiseTableHeader}</th>
            </tr>
          </thead>
          <tbody>
            {skillsData.map((skill, index) => (
              <tr key={index}>
                <td>{skill.name}</td>

                <td>
                  <img src={skill.image}></img>
                </td>
                <td>{skill.expertise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
