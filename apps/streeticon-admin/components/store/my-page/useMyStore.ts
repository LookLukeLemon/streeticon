import { StoreProfile } from "common/store";
import { useEffect, useState } from "react";
import { convertToBase64, getBase64FromUrl } from "utils/ImageUtils";

const useMyStore = (profile: StoreProfile | undefined) => {
  const [category, setCategory] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [thumbnailBase64, setThumbnailBase64] = useState<
    string | ArrayBuffer | null
  >("");

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (name === "desc") {
      setDesc(e.target.value);
    } else if (name === "phone") {
      setPhone(e.target.value);
    } else if (name === "address") {
      setAddress(e.target.value);
    } else if (name === "thumbnail") {
      if (!e.target.files) return;
      setThumbnail(e.target.files[0]);
      const base64 = await convertToBase64(e.target.files[0]);
      setThumbnailBase64(base64);
    }
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const adjustProfile = async () => {
    if (!profile) return;

    try {
      const { businessId, category, desc, phone, address, image } = profile;

      setBusinessId(businessId);
      setCategory(category);
      setDesc(desc);
      setPhone(phone);
      setAddress(address);

      if (image) {
        const remoteImgUrl = `${process.env.NEXT_PUBLIC_IMAGE_CDN}/${profile?.image}`;
        const base64Url = await getBase64FromUrl(remoteImgUrl);
        setThumbnailBase64(base64Url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    adjustProfile();
  }, [profile]);

  return {
    businessId,
    category,
    desc,
    address,
    phone,
    thumbnail,
    thumbnailBase64,
    onChange: handleChange,
    onChangeCategory: handleChangeCategory,
    onChangeTextArea: handleChangeTextArea,
  };
};

export default useMyStore;
