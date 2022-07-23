import { QUERY_KEY_GIFTICON } from "common/Constants";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useGifticon = (
  name: string | string[] | undefined,
  onSuccess?: any,
  onError?: any
) => {
  const axiosPrivate = useAxiosPrivate();

  const fetchGifticon = async ({ signal }: any): Promise<any> => {
    const profileResult = await axiosPrivate.get(`/api/gifticon/${name}`, {
      signal,
    });

    return profileResult.data;
  };

  return useQuery([QUERY_KEY_GIFTICON, name], fetchGifticon, {
    onSuccess,
    onError,
    suspense: true,
  });
};

export default useGifticon;
