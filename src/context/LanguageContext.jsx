import { createContext, useContext, useState } from "react";

// Create a context for managing language-related state
const LanguageContext = createContext();

// Custom hook for consuming language-related context
export const useLanguage = () => {
  // Use the useContext hook to access the LanguageContext
  const context = useContext(LanguageContext);

  // Throw an error if the hook is used outside of a LanguageProvider
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  // Return the context values
  return context;
};

// Provider component for managing language state and providing it to the context
export const LanguageProvider = ({ children }) => {
  // State to track the selected language
  const [selectedLanguage, setSelectedLanguage] = useState("german");

  // Array of available languages
  const availableLanguages = ["german", "english"];

  // Function to handle language changes
  const handleLanguageChange = () => {
    // Get the index of the currently selected language
    const currentIndex = availableLanguages.indexOf(selectedLanguage);

    // Calculate the index of the next language in a cyclic manner
    const nextIndex = (currentIndex + 1) % availableLanguages.length;

    // Set the next language as the selected language
    setSelectedLanguage(availableLanguages[nextIndex]);
  };

  // Provide the language-related values through the LanguageContext.Provider
  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        handleLanguageChange,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};