import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

// Define types for the fetched data and error
interface LanguageData {
  header: any;
  profile: any;
  skillsTables: any;
  work: any;
  labels: any;
  projects: any;
  contact: any;
  reference: any;
  referenceLists: any;
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
    data {
      attributes {
        name
        alternativeText
        url
      }
    }
  }
`;

// Define the GraphQL query
const GET_LANGUAGES = gql`
  query GetLanguages {
    # Query for HEADER data
    header {
      data {
        attributes {
          Button
          Text
          localizations {
            data {
              attributes {
                Button
                Text
              }
            }
          }
        }
      }
    }
    # Query for PROFILE data
    profile {
      data {
        attributes {
          Title
          Text
          skillsTitle
          tableTech
          tableExpertise
          buttonShow
          buttonHide
          localizations {
            data {
              attributes {
                Title
                Text
                skillsTitle
                tableTech
                tableExpertise
                buttonShow
                buttonHide
              }
            }
          }
        }
      }
    }
    # Query for SKILLS TABLE data
    skillsTables(sort: "Column3:desc", pagination: { limit: 100 }) {
      data {
        attributes {
          Column1
          Column2 {
            data {
              attributes {
                name
                alternativeText
                url
              }
            }
          }
          Column3
        }
      }
    }
    # Query for WORK data
    work {
      data {
        attributes {
          Title
          Button
          localizations {
            data {
              attributes {
                Title
                Button
              }
            }
          }
        }
      }
    }
    #Query for LABELS data
    labels {
      data {
        attributes {
          Process
          Description
          Technologies
          Homepage
          Repository
          buttonShow
          buttonHide
          localizations {
          data {
            attributes {
              Process
              Description
              Technologies
              Homepage
              Repository
              buttonShow
              buttonHide
              }
            }
          }
        }
      }
    }

    #Query for PROJECTS data
    projects {
      data {
        attributes {
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
          localizations {
            data {
              attributes {
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
              }
            }
          }
        }
      }
    }

    # Query for CONTACTS data
    contact {
      data {
        attributes {
          Title
          Subtitle
          Linkedin
          Telephone
          Email
          ResumeFullText
          ResumeFullLink {
            data {
              attributes {
                name
                alternativeText
                url
              }
            }
          }
          ResumeDeveloperText
          ResumeDeveloperLink {
            data {
              attributes {
                name
                alternativeText
                url
              }
            }
          }
          localizations {
            data {
              attributes {
                Title
                Subtitle
                Linkedin
                Telephone
                Email
                ResumeFullText
                ResumeFullLink {
                  data {
                    attributes {
                      name
                      alternativeText
                      url
                    }
                  }
                }
                ResumeDeveloperText
                ResumeDeveloperLink {
                  data {
                    attributes {
                      name
                      alternativeText
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    #Query for REFERENCE data
    reference {
      data {
        attributes {
          Title
          localizations {
            data {
              attributes {
                Title
              }
            }
          }
        }
      }
    }

    # Query for REFERENCELIST data
    referenceLists {
      data {
        attributes {
          ReferenceList {
            Quote
            Text
            Link
            LinkText
            Image {
              data {
                attributes {
                  name
                  alternativeText
                  url
                }
              }
            }
          }
          localizations {
            data {
              attributes {
                ReferenceList {
                  Quote
                  Text
                  Link
                  LinkText
                  Image {
                    data {
                      attributes {
                        name
                        alternativeText
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
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
  } = useQuery(GET_LANGUAGES);

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
  }, [queryData, queryError]); // Run the effect when query data or error changes

  // Return the fetched data, loading state, and error
  return { data, loading, error };
};
