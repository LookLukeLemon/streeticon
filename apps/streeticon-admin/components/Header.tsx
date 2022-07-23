import BaseImage from "./common/BaseImage";
import BrunchImage from "public/images/brunch.svg";
import UserConnectButton from "./UserConnectButton";

const Header = () => {
  return (
    <header className="bg-[#1E2A3B] space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <div className="flex items-center justify-between">
        <h2 className="flex gap-4 items-center font-semibold  text-white">
          <div className="h-8 aspect-square relative">
            <BaseImage
              src={BrunchImage}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          골목티콘
        </h2>
        <div className="flex gap-8">
          <UserConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
