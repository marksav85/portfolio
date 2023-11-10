import React from "react";
import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";

export const About = ({ isEnglish }) => {
  const skillsData = [
    { name: "HTML5", image: "/images/icons/html5.png" },
    { name: "CSS", image: "/images/icons/css.png" },
    { name: "JavaScript", image: "/images/icons/javascript4.png" },
    { name: "React", image: "/images/icons/react.png" },
    { name: "Angular", image: "/images/icons/angular.png" },
    { name: "TypeScript", image: "/images/icons/typescript.png" },
    { name: "Node.js", image: "/images/icons/node.png" },
    { name: "MongoDB", image: "/images/icons/mongodb.png" },
    { name: "MySQL", image: "/images/icons/mysql.png" },
    { name: "Firebase", image: "/images/icons/firebase.png" },
    { name: "AWS", image: "/images/icons/aws.png" },
  ];

  const lang = isEnglish ? english : german;
  return (
    <>
      <div className="skills-table-container">
        <h2>Developer Skills</h2>
        <table className="skills-table">
          <thead>
            <tr>
              {/*               <th></th>
              <th></th> */}
            </tr>
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
