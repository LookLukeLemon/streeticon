import { CREATE_NEW_POST } from "common/Constants";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";

const SearchRegion = () => {
  return (
    <div className="flex-1 px-8 flex items-center justify-between text-zinc-400">
      <div className="relative flex items-center">
        <input
          className="outline-none border pl-10 border-zinc-200 rounded-full px-4 py-1.5 placeholder:text-zinc-400 bg-zinc-50"
          placeholder="검색"
        />
        <div className="absolute left-4">
          <IoSearch size={16} />
        </div>
      </div>

      <div className="relative hidden lg:flex text-zinc-100 items-center rounded-full text-sm px-4 py-2.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        <div className="pl-6">{CREATE_NEW_POST}</div>
        <div className="absolute left-4">
          <HiPlus size={16} />
        </div>
      </div>
    </div>
  );
};

export default SearchRegion;
