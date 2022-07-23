import { QUERY_KEY_PROFILE } from "common/Constants";
import { StoreProfile } from "common/store";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useProfile = (onSuccess?: any, onError?: any) => {
  const axiosPrivate = useAxiosPrivate();
  const fetchProfile = async ({ signal }: any): Promise<StoreProfile> => {
    const profileResult = await axiosPrivate.get("/api/store/profile", {
      signal,
    });

    return profileResult.data;
  };

  return useQuery([QUERY_KEY_PROFILE], fetchProfile, {
    onSuccess,
    onError,
    suspense: true,
  });
};

export default useProfile;
