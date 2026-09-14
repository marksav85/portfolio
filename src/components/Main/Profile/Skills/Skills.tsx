// Import language-related context and custom hook
import useLanguageContent from "../../../../hooks/useLanguageContent";

export const Skills = () => {
  // Use language-related context and custom hook
  const language = useLanguageContent();

  // Sort column 3
  const areaOrder: Record<string, number> = {
    Frontend: 1,
    "Backend & CMS": 2,
    "Data & Platforms": 3,
  };

  const sortedSkills = [...(language?.skillsTables ?? [])].sort((a, b) => {
    const areaDifference =
      (areaOrder[a.Column3] ?? 99) - (areaOrder[b.Column3] ?? 99);

    if (areaDifference !== 0) {
      return areaDifference;
    }

    return a.Column1.localeCompare(b.Column1);
  });

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
            {sortedSkills.map((skill) => {
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
