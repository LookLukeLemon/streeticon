import { UpdateGifticonItemDto } from "common/store";
import { useEffect, useState } from "react";
import { convertToBase64, getBase64FromUrl } from "utils/ImageUtils";

const useUpdateGifticon = (gifticon: UpdateGifticonItemDto) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState(0);
  const [base64Thumbnails, setBase64Thumbnails] = useState<
    (string | ArrayBuffer | null)[]
  >([]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    e.preventDefault();
    if (name === "name") {
      setName(e.target.value);
    } else if (name === "desc") {
      setDesc(e.target.value);
    } else if (name === "price") {
      setPrice(e.target.value);
    } else if (name === "total") {
      setTotal(Number(e.target.value));
    } else if (name === "images") {
      if (!e.target.files) return;
      if (e.target.files?.length > 5) {
        alert("이미지는 최대 5개까지 업로드 할 수 있습니다.");
        return;
      }

      const uploadFiles = [];

      for (let i = 0; i < e.target.files.length; i++) {
        const file: File = e.target.files[i];
        const base64 = await convertToBase64(file);
        uploadFiles.push(base64);
      }

      setBase64Thumbnails(uploadFiles);
    }
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const adjustGifticon = async () => {
    if (!gifticon) return;

    try {
      const {
        name,
        desc,
        price,
        totalCount,
        image1,
        image2,
        image3,
        image4,
        image5,
      } = gifticon;

      setName(name);
      setDesc(desc);
      setPrice(price);
      setTotal(totalCount);

      const results = await Promise.allSettled(
        [image1, image2, image3, image4, image5]
          .filter((img) => !!img)
          .map(async (imgUrl) => {
            if (imgUrl) {
              const remoteImgUrl = `${process.env.NEXT_PUBLIC_IMAGE_CDN}/${imgUrl}`;
              return await getBase64FromUrl(remoteImgUrl);
            }
          })
      );

      const base64List = results
        .filter((r) => r.status === "fulfilled")
        .map((r) => (r as PromiseFulfilledResult<string>).value);

      setBase64Thumbnails(base64List);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    adjustGifticon();
  }, [gifticon]);

  return {
    name,
    desc,
    price,
    total,
    base64Thumbnails,
    onChange: handleChange,
    onChangeTextArea: handleChangeTextArea,
  };
};

export default useUpdateGifticon;
