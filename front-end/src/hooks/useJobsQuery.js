import { useMutation } from "react-query";
import { searchApi } from "../http-common";

export const useJobsQuery = (onSuccess, onError, searchQuery) => {
  return useMutation(
    async () => {
      console.log("Entered async", searchQuery)
      return await searchApi.post("/searchForJobs", searchQuery);
    },
    { onSuccess, onError, }
  );
};

export default useJobsQuery;
