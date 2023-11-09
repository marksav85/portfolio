import React from "react";
import * as english from "../../languages/en.json";
import * as german from "../../languages/de.json";

export const About = () => {
  const [isEnglish, setIsEnglish] = React.useState(true);
  const skillsData = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React.js",
    "Node.js",
    "Git",
    "Responsive Design",
    "UI/UX Design",
    "Version Control",
    "Problem Solving",
  ];

  const lang = isEnglish ? english : german;
  return (
    <>
      <button
        onClick={() => setIsEnglish(!isEnglish)}
        className="lang-toggle-button"
      >
        {isEnglish ? (
          <img src="/images/english.png" alt="headshot"></img>
        ) : (
          <img src="/images/deutsch.png" alt="headshot"></img>
        )}
      </button>
      <div className="skills-table-container">
        <h2>Developer Skills</h2>
        <table className="skills-table">
          <thead>
            <tr>
              <th>Skill</th>
            </tr>
          </thead>
          <tbody>
            {skillsData.map((skill, index) => (
              <tr key={index}>
                <td>{skill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
