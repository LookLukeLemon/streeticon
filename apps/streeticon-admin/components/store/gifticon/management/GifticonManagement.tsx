import { STORE_GIFTICON_MANAGEMENT } from "common/Constants";
import LoadingSpinner from "components/common/LoadingSpinner";
import Link from "next/link";
import GifticonItem from "./GifticonItem";
import InfiniteGifticonList from "./InfiniteGifticonList";
import useGifticonApi from "../useGifticonApi";
import useGifticonManagement from "./useGifticonManagement";

const GifticonManagement = () => {
  const { onClickUpdate, onGotoSignIn } = useGifticonApi();
  const {
    items,
    itemsLength,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGifticonManagement();

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 lg:p-16 flex h-full w-full justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    onGotoSignIn();
    return null;
  }

  return (
    <div className="p-4 md:p-8 lg:p-16 flex flex-col gap-8 h-full w-full">
      <div className="flex items-center gap-4 text-xl">
        <span className="flex h-4 w-4 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full left-1 top-1 h-2 w-2 bg-sky-500"></span>
        </span>
        <h2 className="flex-1 truncate">{STORE_GIFTICON_MANAGEMENT}</h2>
        <Link href="/store/gifticon/add">
          <div className="flex btn btn--primary cursor-pointer">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            발행하기
          </div>
        </Link>
      </div>
      <div className="h-fit w-full   rounded-xl text-white bg-[#1E2A3B] divide-y divide-slate-700/90">
        <div className="h-full">
          <InfiniteGifticonList
            itemsLength={itemsLength}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          >
            {items?.map((item) => (
              <GifticonItem
                key={item.name}
                image1={item.image1}
                image2={item.image2}
                image3={item.image3}
                image4={item.image4}
                image5={item.image5}
                name={item.name}
                price={item.price}
                desc={item.desc}
                totalCount={item.totalCount}
                soldCount={item.soldCount}
                createdAt={item.createdAt}
                onClickUpdate={onClickUpdate}
              />
            ))}
          </InfiniteGifticonList>
        </div>
      </div>
    </div>
  );
};

export default GifticonManagement;
