import React from "react";
import Suggestions from "./suggestions/Suggestions";
import TrendingFeed from "./trending-feed/TrendingFeed";

const RightSide = () => {
  return (
    <aside className="hidden xl:flex flex-col w-64 p-8">
      <h2 className="font-semibold pb-8">Trending Feed</h2>
      <TrendingFeed />
      <h2 className="font-semibold py-8">Suggestions for you</h2>
      <Suggestions />
    </aside>
  );
};

export default RightSide;
