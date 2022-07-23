import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { MdNotificationsNone } from "react-icons/md";
import { TbSend } from "react-icons/tb";

const TailRegion = () => {
  return (
    <div className="w-64 hidden md:flex items-center justify-between px-8">
      <div className="rounded-full border cursor-pointer bg-zinc-50 relative border-zinc-200 p-2.5 text-zinc-500">
        <TbSend size={20} />
        <span className="flex absolute right-0 top-1 h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
        </span>
      </div>

      <div className="rounded-full cursor-pointer border relative border-zinc-200 bg-zinc-50 p-2.5 text-zinc-500">
        <MdNotificationsNone size={20} />
        <span className="flex absolute right-0 top-1 h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>
      <div className="cursor-pointer">
        <HiOutlineMenu size={20} />
      </div>
    </div>
  );
};

export default TailRegion;
