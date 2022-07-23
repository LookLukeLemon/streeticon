import { ReactNode } from "react";

const GifticonList = ({ children }: { children: ReactNode }) => {
  return <ul className="divide-y w-full divide-slate-700">{children}</ul>;
};

export default GifticonList;
