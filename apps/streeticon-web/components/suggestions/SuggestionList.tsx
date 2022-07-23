import { ReactNode } from "react";

const SuggestionList = ({ children }: { children: ReactNode }) => {
  return <ul className="w-full h-fit grid gap-4">{children}</ul>;
};

export default SuggestionList;
