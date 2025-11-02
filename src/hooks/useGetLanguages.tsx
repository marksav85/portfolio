import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

interface ImageAttributes {
  name: string;
  alternativeText: string;
  url: string;
}

interface LocalizationMeta {
  locale?: string;
  documentId?: string;
}

type Localized<T> = T & LocalizationMeta & {
  localizations?: Array<T & LocalizationMeta>;
};

interface RichTextChild {
  text?: string;
  bold?: boolean;
  type?: string;
}

interface RichTextParagraph {
  type: string;
  children: RichTextChild[];
}

type MediaRelation = ImageAttributes | ImageAttributes[] | null | undefined;

type HeaderContent = Localized<{
  Button: string;
  Text: RichTextParagraph[];
}>;

type ProfileContent = Localized<{
  Title: string;
  Text: string;
  skillsTitle: string;
  tableTech: string;
  tableExpertise: string;
  buttonShow: string;
  buttonHide: string;
}>;

interface SkillsTableEntry {
  Column1: string;
  Column2: MediaRelation;
  Column3: string;
}

type WorkContent = Localized<{
  Title: string;
  Button: string;
}>;

type LabelsContent = Localized<{
  Process: string;
  Description: string;
  Technologies: string;
  Homepage: string;
  Repository: string;
  buttonShow: string;
  buttonHide: string;
}>;

type ProjectEntry = {
  Intro?: string;
  Text?: string;
  TextBlock?: RichTextParagraph[];
  Title?: string;
  Technologies?: string;
  Repository?: string;
  Homepage?: string;
  hasHomepage?: boolean;
  Images?: MediaRelation;
};

type ProjectSet = Localized<{
  Project1?: ProjectEntry;
  Project2?: ProjectEntry;
  Project3?: ProjectEntry;
  Project4?: ProjectEntry;
  Project5?: ProjectEntry;
  Project6?: ProjectEntry;
  Project7?: ProjectEntry;
  Project8?: ProjectEntry;
  Project9?: ProjectEntry;
  Project10?: ProjectEntry;
}>;

type ContactContent = Localized<{
  Title: string;
  Subtitle: string;
  Linkedin: string;
  Telephone: string;
  Email: string;
  ResumeFullText: string | null;
  ResumeFullLink: string | null;
  ResumeDeveloperText: string | null;
  ResumeDeveloperLink: string | null;
}>;

type ReferenceContent = Localized<{
  Title: string;
}>;

type ReferenceListContent = Localized<{
  ReferenceList: {
    Quote: RichTextParagraph[];
    Text: string;
    Link: string;
    LinkText: string;
    Image: ImageAttributes | ImageAttributes[] | null;
  };
}>;

interface LanguageData {
  header: HeaderContent;
  profile: ProfileContent;
  skillsTables: SkillsTableEntry[] | null;
  work: WorkContent;
  labels: LabelsContent[] | null;
  projects: ProjectSet[] | null;
  contact: ContactContent;
  reference: ReferenceContent;
  referenceLists: ReferenceListContent[] | null;
}

interface LanguageError {
  message: string;
}

const projectAttributes = `
  Intro
  Text
  TextBlock
  Title
  Technologies
  Repository
  Homepage
  hasHomepage
  Images {
    name
    alternativeText
    url
  }
`;

const GET_LANGUAGES = gql`
  query GetLanguages {
    header {
      Button
      Text
      locale
      documentId
      localizations {
        Button
        Text
        locale
        documentId
      }
    }
    profile {
      Title
      Text
      skillsTitle
      tableTech
      tableExpertise
      buttonShow
      buttonHide
      locale
      documentId
      localizations {
        Title
        Text
        skillsTitle
        tableTech
        tableExpertise
        buttonShow
        buttonHide
        locale
        documentId
      }
    }
    skillsTables(sort: "Column3:desc", pagination: { limit: 100 }) {
      Column1
      Column2 {
        name
        alternativeText
        url
      }
      Column3
    }
    work {
      Title
      Button
      locale
      documentId
      localizations {
        Title
        Button
        locale
        documentId
      }
    }
    labels {
      Process
      Description
      Technologies
      Homepage
      Repository
      buttonShow
      buttonHide
      locale
      documentId
      localizations {
        Process
        Description
        Technologies
        Homepage
        Repository
        buttonShow
        buttonHide
        locale
        documentId
      }
    }
    projects {
      Project1 {
        ${projectAttributes}
      }
      Project2 {
        ${projectAttributes}
      }
      Project3 {
        ${projectAttributes}
      }
      Project4 {
        ${projectAttributes}
      }
      Project5 {
        ${projectAttributes}
      }
      Project6 {
        ${projectAttributes}
      }
      Project7 {
        ${projectAttributes}
      }
      Project8 {
        ${projectAttributes}
      }
      Project9 {
        ${projectAttributes}
      }
      Project10 {
        ${projectAttributes}
      }
      locale
      documentId
      localizations {
        Project1 {
          ${projectAttributes}
        }
        Project2 {
          ${projectAttributes}
        }
        Project3 {
          ${projectAttributes}
        }
        Project4 {
          ${projectAttributes}
        }
        Project5 {
          ${projectAttributes}
        }
        Project6 {
          ${projectAttributes}
        }
        Project7 {
          ${projectAttributes}
        }
        Project8 {
          ${projectAttributes}
        }
        Project9 {
          ${projectAttributes}
        }
        Project10 {
          ${projectAttributes}
        }
        locale
        documentId
      }
    }
    contact {
      Title
      Subtitle
      Linkedin
      Telephone
      Email
      ResumeFullText
      ResumeFullLink
      ResumeDeveloperText
      ResumeDeveloperLink
      locale
      documentId
      localizations {
        Title
        Subtitle
        Linkedin
        Telephone
        Email
        ResumeFullText
        ResumeFullLink
        ResumeDeveloperText
        ResumeDeveloperLink
        locale
        documentId
      }
    }
    reference {
      Title
      locale
      documentId
      localizations {
        Title
        locale
        documentId
      }
    }
    referenceLists {
      ReferenceList {
        Quote
        Text
        Link
        LinkText
        Image {
          name
          alternativeText
          url
        }
      }
      locale
      documentId
      localizations {
        ReferenceList {
          Quote
          Text
          Link
          LinkText
          Image {
            name
            alternativeText
            url
          }
        }
        locale
        documentId
      }
    }
  }
`;

// Custom hook to fetch languages using GraphQL query
export const useGetLanguages = () => {
  // State to store the fetched data
  const [data, setData] = useState<LanguageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<LanguageError | null>(null);

  // Use the useQuery hook from @apollo/client to fetch the data
  const {
    data: queryData, // Fetched data from the GraphQL query
    loading: queryLoading, // Loading state from the GraphQL query
    error: queryError, // Error state from the GraphQL query
  } = useQuery(GET_LANGUAGES, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    // Update state when the query data changes
    if (queryData) {
      setData(queryData); // Set the fetched data in the state
      setLoading(false); // Set loading to false
    }

    // Update state if there's an error
    if (queryError) {
      setError(queryError); // Set the error in the state
      setLoading(false); // Set loading to false
    }
  }, [queryData, queryError, queryLoading]); // Run the effect when query data or error changes

  // Return the fetched data, loading state, and error
  return { data, loading, error };
};
