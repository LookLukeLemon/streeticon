import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useRouter } from "next/router";

const useGifticonApi = () => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();

  const handleGotoSignIn = () => {
    router.replace("/store/sign-in");
  };
  const handleClickUpdate = (name: string) => {
    if (!name) return;

    router.push(`/store/gifticon/management/${name}`);
  };

  const handleSubmitAddGifticon = async (
    e: any,
    base64Thumbnails: (string | ArrayBuffer | null)[],
    name: string,
    desc: string,
    price: string,
    total: number
  ) => {
    if (base64Thumbnails.length === 0) return;
    e.preventDefault();

    const jsonBody = {
      name,
      desc,
      price,
      totalCount: total,
      images: base64Thumbnails,
    };

    try {
      const result = await axiosPrivate.post("/api/gifticon", jsonBody);

      if (result.status === 201) {
        router.replace("/store/gifticon/management");
      }
    } catch (err) {
      // FIXME: 메시지 토스트
    }
  };

  const handleSubmitUpdateGifticon = async (
    e: any,
    base64Thumbnails: (string | ArrayBuffer | null)[],
    name: string,
    desc: string,
    price: string,
    total: number
  ) => {
    if (base64Thumbnails.length === 0) return;
    e.preventDefault();

    const jsonBody = {
      name,
      desc,
      price,
      totalCount: total,
      images: base64Thumbnails,
    };

    try {
      const result = await axiosPrivate.patch("/api/gifticon", jsonBody);

      if (result.status === 204) {
        router.replace("/store/gifticon/management");
      }
    } catch (err) {
      // FIXME: 메시지 토스트
    }
  };

  return {
    onClickUpdate: handleClickUpdate,
    onGotoSignIn: handleGotoSignIn,
    onSubmitAddGifticon: handleSubmitAddGifticon,
    onSubmitUpdateGifticon: handleSubmitUpdateGifticon,
  };
};

export default useGifticonApi;
