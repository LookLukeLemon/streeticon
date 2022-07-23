import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideMenu from "./SideMenu";

type ILayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="divide-y divide-slate-700 text-white bg-[#182334]">
      <Header />
      <div className="min-h-screen flex">
        <SideMenu />
        <main className="flex-1">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
