import { CATEGORIES } from "common/Constants";
import { useState } from "react";
import { convertToBase64 } from "utils/ImageUtils";

const useSignUp = () => {
  const [name, setName] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].value);
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
    if (name === "name") {
      setName(e.target.value);
    } else if (name === "password") {
      setPassword(e.target.value);
    } else if (name === "id") {
      setBusinessId(e.target.value);
    } else if (name === "desc") {
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

  return {
    businessId,
    name,
    password,
    category,
    desc,
    phone,
    address,
    thumbnail,
    thumbnailBase64,
    onChange: handleChange,
    onChangeTextArea: handleChangeTextArea,
    onChangeCategory: handleChangeCategory,
  };
};

export default useSignUp;
