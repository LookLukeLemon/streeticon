import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useRouter } from "next/router";

const useMyStoreApi = () => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async ({
    e,
    businessId,
    desc,
    category,
    phone,
    address,
    thumbnailBase64,
  }: {
    e: any;
    businessId: string;
    desc: string;
    category: string;
    phone: string;
    address: string;
    thumbnailBase64: string | ArrayBuffer | null;
  }) => {
    e.preventDefault();

    const jsonBody = {
      businessId,
      desc,
      category,
      phone,
      address,
      thumbnailBase64,
    };

    try {
      const result = await axiosPrivate.patch("/api/store/profile", jsonBody);

      if (result.status === 200) {
        router.replace("/store/dashboard");
      }
    } catch (err) {
      // FIXME: 메시지 토스트
    }
  };

  return {
    onSubmit: handleSubmit,
  };
};

export default useMyStoreApi;
