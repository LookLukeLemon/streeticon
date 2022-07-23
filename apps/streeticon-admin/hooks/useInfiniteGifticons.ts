import { QUERY_KEY_GIFTICONS } from "common/Constants";
import useAxiosPrivate from "./useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";

export type InfiniteGifticonsProps = {
  perPage: number;
  onSuccess?: () => void;
  onError?: () => void;
};

const useInfiniteGifticons = ({
  perPage,
  onSuccess,
  onError,
}: InfiniteGifticonsProps) => {
  const axiosPrivate = useAxiosPrivate();
  const fetchItems = async ({ pageParam = 1, signal }: any) => {
    const result = await axiosPrivate.get(`/api/gifticon`, {
      params: { page: pageParam, perPage },
      signal,
    });
    const { items, total } = result.data;
    console.log(items);

    return {
      items,
      total,
      nextPage: pageParam + 1,
      isLast: !(pageParam * perPage < total),
    };
  };

  return useInfiniteQuery([QUERY_KEY_GIFTICONS], fetchItems, {
    onSuccess,
    onError,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
  });
};

export default useInfiniteGifticons;
