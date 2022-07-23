import React, { ReactNode } from "react";
import {
  RiHome5Fill,
  RiHome5Line,
  RiSettings5Line,
  RiSettings5Fill,
} from "react-icons/ri";
import { HiOutlineCollection, HiCollection } from "react-icons/hi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoStatsChartOutline, IoStatsChartSharp } from "react-icons/io5";
import SideMenuList from "./SideMenuList";

export type SideMenuItemProps = {
  imgNode: ReactNode;
  name: string;
};

const menuItems = [
  {
    imgNode: <RiHome5Line size={20} />,
    selectedImgNode: <RiHome5Fill size={20} />,
    name: "피드",
  },
  {
    imgNode: <HiOutlineCollection size={20} />,
    selectedImgNode: <HiCollection size={20} />,
    name: "골목길",
  },
  {
    imgNode: <FaRegBookmark size={20} />,
    selectedImgNode: <FaBookmark size={20} />,
    name: "좋아요",
  },
  {
    imgNode: <TbSend size={20} />,
    selectedImgNode: <RiSendPlaneFill size={20} />,
    name: "메시지",
  },
  {
    imgNode: <IoStatsChartOutline size={20} />,
    selectedImgNode: <IoStatsChartSharp size={20} />,
    name: "상태",
  },
  {
    imgNode: <RiSettings5Line size={20} />,
    selectedImgNode: <RiSettings5Fill size={20} />,
    name: "설정",
  },
];

const SideMenuItem = ({ imgNode, name }: SideMenuItemProps) => {
  return (
    <div className="flex cursor-pointer hover:bg-zinc-50 text-sm items-center gap-4 text-zinc-400 px-8 py-4">
      {imgNode}
      {name}
    </div>
  );
};

const SideMenu = () => {
  return (
    <nav>
      <SideMenuList>
        {menuItems.map((mi) => (
          <SideMenuItem key={mi.name} {...mi} />
        ))}
      </SideMenuList>
    </nav>
  );
};

export default SideMenu;
