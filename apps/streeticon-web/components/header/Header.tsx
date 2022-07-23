import LogoRegion from "./LogoRegion";
import TailRegion from "./TailRegion";
import SearchRegion from "./SearchRegion";

const Header = () => {
  return (
    <header className="flex sticky top-0 lg:divide-x divide-zinc-200 h-20 bg-white z-10">
      <LogoRegion />
      <SearchRegion />
      <TailRegion />
    </header>
  );
};

export default Header;
