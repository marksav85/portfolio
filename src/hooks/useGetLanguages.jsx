import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

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
  }
`;

// Custom hook to fetch languages using GraphQL query
export const useGetLanguages = () => {
  // State to store the fetched data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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