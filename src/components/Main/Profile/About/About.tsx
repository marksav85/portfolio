// Import language-related context and custom hook
import useLanguageContent from "../../../../hooks/useLanguageContent";
import { useLanguage } from "../../../../context/LanguageContext";

export const About = () => {
  // Use language-related context and custom hook
  const language = useLanguageContent();
  const { baseUrl } = useLanguage();

  return (
    <>
      <div className="skills-table-container">
        {/* Display skills title */}
        <h2>{language?.profile?.skillsTitle}</h2>
        {/* Skills table */}
        <table className="skills-table">
          <thead>
            <tr>
              <th>{language?.profile?.tableTech}</th>{" "}
              {/* Display table column header for technology */}
              <th></th> {/* Empty column */}
              <th>{language?.profile?.tableExpertise}</th>{" "}
              {/* Display table column header for expertise */}
            </tr>
          </thead>
          <tbody>
            {/* Map over skills tables data and render each skill */}
            {language?.skillsTables?.map((skill: any, index: number) => (
              <tr key={index}>
                {/* Display technology name */}
                <td>{skill.attributes.Column1}</td>
                <td>
                  {/* Display technology icon */}
                  <img
                    src={baseUrl + skill.attributes.Column2.data.attributes.url}
                    alt={
                      skill.attributes.Column2.data.attributes.alternativeText
                    }
                  />
                </td>
                {/* Display expertise level */}
                <td>{`${skill.attributes.Column3}/5`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
