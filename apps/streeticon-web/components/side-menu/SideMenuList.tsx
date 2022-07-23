import { ReactNode } from "react";

const SideMenuList = ({ children }: { children: ReactNode }) => {
  return <ul className="pt-8 w-full">{children}</ul>;
};

export default SideMenuList;
