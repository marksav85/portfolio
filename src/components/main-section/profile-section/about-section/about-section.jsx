import React from "react";
import * as english from "../../../../languages/en.json";
import * as german from "../../../../languages/de.json";

export const About = ({ isEnglish }) => {
  const skillsData = [
    { name: "HTML5", image: "images/aboutme-icons/html5.png" },
    { name: "CSS", image: "images/aboutme-icons/css.png" },
    { name: "JavaScript", image: "images/aboutme-icons/javascript4.png" },
    { name: "React", image: "images/aboutme-icons/react.png" },
    { name: "Angular", image: "images/aboutme-icons/angular.png" },
    { name: "TypeScript", image: "images/aboutme-icons/typescript.png" },
    { name: "Node.js", image: "images/aboutme-icons/node.png" },
    { name: "MongoDB", image: "images/aboutme-icons/mongodb.png" },
    { name: "MySQL", image: "images/aboutme-icons/mysql.png" },
    { name: "Firebase", image: "images/aboutme-icons/firebase.png" },
    { name: "AWS", image: "images/aboutme-icons/aws.png" },
  ];

  const lang = isEnglish ? english : german;
  return (
    <>
      <div className="skills-table-container">
        <h2>Developer Skills</h2>
        <table className="skills-table">
          <thead>
            {/* <tr>
              <th>Technology</th>
              <th>Icon</th>
            </tr> */}
          </thead>
          <tbody>
            {skillsData.map((skill, index) => (
              <tr key={index}>
                <td>{skill.name}</td>
                <td>
                  <img src={skill.image}></img>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
