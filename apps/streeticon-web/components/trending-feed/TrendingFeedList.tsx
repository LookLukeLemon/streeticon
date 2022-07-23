import { ReactNode } from "react";

const TrendingFeedList = ({ children }: { children: ReactNode }) => {
  return <ul className="grid grid-cols-2 w-full h-fit gap-2">{children}</ul>;
};

export default TrendingFeedList;
