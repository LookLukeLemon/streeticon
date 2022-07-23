import { QUERY_KEY_USER_PROFILE } from "common/Constants";
import { UserProfile } from "common/store";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useProfile = (onSuccess?: any, onError?: any) => {
  const axiosPrivate = useAxiosPrivate();
  const fetchProfile = async ({ signal }: any): Promise<UserProfile> => {
    const profileResult = await axiosPrivate.get("/api/user/profile", {
      signal,
    });

    return profileResult.data;
  };

  return useQuery([QUERY_KEY_USER_PROFILE], fetchProfile, {
    onSuccess,
    onError,
    suspense: true,
  });
};

export default useProfile;
