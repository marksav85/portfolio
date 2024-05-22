import { createContext, useContext, useState, ReactNode } from "react";

// Define types for the context value
interface LanguageContextType {
  selectedLanguage: string;
  handleLanguageChange: () => void;
  baseUrl: string;
}

// Define the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

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

// Define types for the provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Provider component for managing language state and providing it to the context
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
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

  const baseUrl = "http://localhost:1337"; // Base URL

  // Provide the language-related values through the LanguageContext.Provider
  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        handleLanguageChange,
        baseUrl,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
