// Import language-related context and custom hook
import useLanguageContent from "../../../../hooks/useLanguageContent";

export const Skills = () => {
  // Use language-related context and custom hook
  const language = useLanguageContent();

  return (
    <>
      <div id="profile-skills" className="skills-table-container">
        {/* Display skills title */}
        <h2>{language?.profile?.skillsTitle}</h2>
        {/* Skills table */}
        <table className="skills-table">
          <thead>
            <tr>
              <th>{language?.profile?.tableTech}</th>
              <th></th>
              <th>{language?.profile?.tableArea}</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over skills tables data and render each skill */}
            {language?.skillsTables?.map((skill) => {
              const technology = skill.Column1;
              const icon = skill.Column2;
              const area = skill.Column3;

              return (
                <tr key={skill.id ?? technology}>
                  {/* Display technology name */}
                  <td>{technology}</td>
                  <td>
                    {/* Display technology icon */}
                    {icon && (
                      <img
                        src={icon.url}
                        alt={icon.alternativeText ?? ""}
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </td>
                  {/* Display technology area */}
                  <td>{area}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
