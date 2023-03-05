import { useMutation } from "react-query";
import { searchApi } from "../http-common";

export const useCVQuery = (onSuccess, onError, id) => {
  return useMutation(
    async () => {
      console.log("Entered async", id)
      const url = `getCvByID/${id}`
      return await searchApi.get(url);
    },
    { onSuccess, onError, }
  );
};

export default useCVQuery;