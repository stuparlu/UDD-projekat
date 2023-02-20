import { useMutation } from "react-query";
import { searchApi } from "../http-common";

export const useAdvancedJobsQuery = (onSuccess, onError, firstNameQuery, lastNameQuery, educationLevelQuery, cvQuery, coverQuery, locationQuery, locationDistanceQuery) => {
  return useMutation(
    async () => {
      console.log("Entered async", firstNameQuery)
      return await searchApi.post("/advancedSearchForJobs", {
        first_name: firstNameQuery,
        last_name: lastNameQuery,
        education_level: educationLevelQuery,
        cv: cvQuery,
        cover_letter: coverQuery,
        location: locationQuery,
        distance: locationDistanceQuery
      });
    },
    { onSuccess, onError, }
  );
};

export default useAdvancedJobsQuery;
