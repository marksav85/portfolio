// Import necessary hooks from context and custom hook
import { useLanguage } from "../context/LanguageContext";
import { useGetLanguages } from "./useGetLanguages";

// Define a custom hook to use the selected language
const useLanguageContent = () => {
  // Destructure the selected language from the useLanguage hook
  const { selectedLanguage } = useLanguage();

  // Fetch language data using the useGetLanguages hook
  const { data } = useGetLanguages();

  // Check if the data is available
  if (!data) {
    return null;
  }

  const localeMap: Record<string, string> = {
    german: "de",
    english: "en",
  };

  const targetLocale = localeMap[selectedLanguage] ?? "en";

  const selectLocalized = (entity: any): any => {
    if (!entity) {
      return entity;
    }

    if (Array.isArray(entity)) {
      const directMatch = entity.find(
        (item) => item?.locale === targetLocale
      );

      if (directMatch) {
        return directMatch;
      }

      return selectLocalized(entity[0]);
    }

    if (entity.locale === targetLocale) {
      return entity;
    }

    const localizedMatch = entity.localizations?.find(
      (item: any) => item?.locale === targetLocale
    );

    return localizedMatch ?? entity;
  };

  const header = selectLocalized(data.header);
  const profile = selectLocalized(data.profile);
  const work = selectLocalized(data.work);
  const projects = selectLocalized(data.projects);
  const contact = selectLocalized(data.contact);
  const reference = selectLocalized(data.reference);
  const labelsEntry = selectLocalized(data.labels);
  const referenceListEntry = selectLocalized(data.referenceLists);
  const skillsTables = data.skillsTables ?? [];

  // Switch statement to determine the language content based on the selected language
  switch (selectedLanguage) {
    case "german":
      return {
        header,
        profile,
        skillsTables,
        work,
        labels: labelsEntry,
        projects,
        contact,
        reference,
        referenceLists: referenceListEntry,
      }; // German
    case "english":
      return (
        data && {
          header,
          profile,
          skillsTables,
          work,
          labels: labelsEntry,
          projects,
          contact,
          reference,
          referenceLists: referenceListEntry,
        }
      ); // English
    default:
      return (
        data && {
          header,
          profile,
          skillsTables,
          work,
          labels: labelsEntry,
          projects,
          contact,
          reference,
          referenceLists: referenceListEntry,
        }
      ); // Default to German if the language is not recognized
  }
};

// Export the custom hook
export default useLanguageContent;
