import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./header/Header";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col divide-y divide-zinc-200 min-h-screen">
      <Header />
      <div className="flex flex-1 divide-x divide-zinc-200">
        <LeftSide />
        <main className="flex-1">{children}</main>
        <RightSide />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
