import LoadingSpinner from "components/common/LoadingSpinner";
import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GifticonList from "./GifticonList";

export type InfiniteGifticonListProps = {
  children: ReactNode;
  itemsLength: number;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
};

const InfiniteGifticonList = ({
  children,
  itemsLength,
  fetchNextPage,
  hasNextPage,
}: InfiniteGifticonListProps) => {
  return (
    <InfiniteScroll
      scrollThreshold={0.7}
      dataLength={itemsLength}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={
        <div className="py-8">
          <LoadingSpinner />
        </div>
      }
    >
      <GifticonList>{children}</GifticonList>
    </InfiniteScroll>
  );
};

export default InfiniteGifticonList;
