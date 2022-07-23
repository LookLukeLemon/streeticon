import BaseImage from "components/common/BaseImage";
import React from "react";
import LogoImage from "public/images/logo-icon.svg";

const MyProfile = () => {
  return (
    <div className="flex flex-col border-b border-zinc-200">
      <div className="flex flex-col justify-center items-center py-8 ">
        <div className="relative w-20 h-20 overflow-hidden rounded-full">
          <BaseImage src={LogoImage} layout="fill" objectFit="contain" />
        </div>
        <h3 className="font-semibold pt-4 text-center truncate px-8 w-full">
          Luke teo
        </h3>
        <p className="text-xs w-full text-center truncate px-8 text-zinc-400">
          서울, 대한민국
        </p>
      </div>
      <dl className="grid grid-cols-3 pb-4 px-8 ">
        <dd className="grid grid-rows-2">
          <span className="justify-self-center">1</span>
          <h4 className=" text-2xs justify-self-center text-zinc-400">
            포스트
          </h4>
        </dd>
        <dd className="grid grid-rows-2">
          <span className="justify-self-center">12</span>
          <h4 className=" text-2xs justify-self-center text-zinc-400">
            팔로워
          </h4>
        </dd>
        <dd className="grid grid-rows-2">
          <span className="justify-self-center">4</span>
          <h4 className=" text-2xs justify-self-center text-zinc-400">
            팔로잉
          </h4>
        </dd>
      </dl>
    </div>
  );
};

export default MyProfile;
