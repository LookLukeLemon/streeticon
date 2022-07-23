import { APP_TITLE } from "common/Constants";
import BaseImage from "components/common/BaseImage";
import React from "react";
import LogoImage from "public/images/logo-icon.svg";

const LogoRegion = () => {
  return (
    <div className="w-64 hidden md:flex px-8 items-center space-x-4">
      <div className="relative w-8 aspect-square">
        <BaseImage src={LogoImage} layout="fill" objectFit="contain" />
      </div>
      <h1>{APP_TITLE}</h1>
    </div>
  );
};

export default LogoRegion;
