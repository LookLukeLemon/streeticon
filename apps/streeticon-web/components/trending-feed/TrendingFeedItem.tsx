import BaseImage from "components/common/BaseImage";
import { StaticImageData } from "next/image";

const TrendingFeedItem = ({ img }: { img: StaticImageData }) => {
  return (
    <div className="relative h-20 rounded-lg overflow-hidden">
      <BaseImage src={img} layout="fill" objectFit="cover" />
    </div>
  );
};

export default TrendingFeedItem;
