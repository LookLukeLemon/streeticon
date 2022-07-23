import { QUERY_GIFTICONS_PER_PAGE } from "common/Constants";
import { GifticonItemsProps } from "common/store";
import useInfiniteGifticons from "hooks/useInfiniteGifticons";

const useGifticonManagement = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteGifticons({
      perPage: QUERY_GIFTICONS_PER_PAGE,
    });

  const items: GifticonItemsProps = data?.pages.flatMap((d) => d.items);
  const itemsLength = items?.length || 0;

  return {
    items,
    itemsLength,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  };
};

export default useGifticonManagement;
