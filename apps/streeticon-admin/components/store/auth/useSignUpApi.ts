import axios from "axios";
import { SignInProps } from "common/store";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";

const useSignUpApi = () => {
  const router = useRouter();
  const { setAuth } = useAuth();
  const handleSubmit = async ({
    e,
    businessId,
    name,
    password,
    desc,
    category,
    phone,
    address,
    thumbnailBase64,
  }: {
    e: any;
    businessId: string;
    name: string;
    password: string;
    desc: string;
    category: string;
    phone: string;
    address: string;
    thumbnailBase64: string | ArrayBuffer | null;
  }) => {
    if (!thumbnailBase64) return;
    e.preventDefault();

    const jsonBody = {
      businessId,
      name,
      password,
      desc,
      category,
      phone,
      address,
      thumbnailBase64,
    };

    try {
      const result = await axios.post("/api/store/sign-up", jsonBody);

      if (result.status === 201) {
        const payload: SignInProps = { username: name, password };

        const response = await axios.post("/api/auth/store/sign-in", payload, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        const accessToken = response?.data?.access_token;
        setAuth({ accessToken });
        router.replace("/store/dashboard");
      }
    } catch (err) {
      // FIXME: 메시지 토스트
    }
  };

  return { onSubmit: handleSubmit };
};

export default useSignUpApi;
