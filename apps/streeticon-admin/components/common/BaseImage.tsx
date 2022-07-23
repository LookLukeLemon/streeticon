/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageLoaderProps } from "next/image";

const customLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src.startsWith("/_next/static")) {
    return `${src}?w=${width}&q=${quality || 75}`;
  } else {
    return `${process.env.NEXT_PUBLIC_IMAGE_CDN}/${src}?w=${width}&q=${
      quality || 75
    }`;
  }
};

const BaseImage = (props: any) => {
  return <Image loader={customLoader} {...props} alt="" />;
};

export default BaseImage;
