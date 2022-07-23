import React from "react";
import TrendingFeed1 from "public/images/trending-feed-1.jpg";
import TrendingFeed2 from "public/images/trending-feed-2.jpg";
import TrendingFeed3 from "public/images/trending-feed-3.jpg";
import TrendingFeed4 from "public/images/trending-feed-4.jpg";
import TrendingFeedList from "./TrendingFeedList";
import TrendingFeedItem from "./TrendingFeedItem";

const TrendingFeed = () => {
  return (
    <TrendingFeedList>
      <TrendingFeedItem img={TrendingFeed1} />
      <TrendingFeedItem img={TrendingFeed2} />
      <TrendingFeedItem img={TrendingFeed3} />
      <TrendingFeedItem img={TrendingFeed4} />
    </TrendingFeedList>
  );
};

export default TrendingFeed;
