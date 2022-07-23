import axios from "axios";
import { SignInProps } from "common/store";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";

const useSignInApi = () => {
  const router = useRouter();
  const { setAuth } = useAuth();

  const handleSubmit = async ({
    e,
    name,
    password,
  }: {
    e: any;
    name: string;
    password: string;
  }) => {
    e.preventDefault();

    const payload: SignInProps = { username: name, password };

    try {
      const response = await axios.post("/api/auth/store/sign-in", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const accessToken = response?.data?.access_token;
      setAuth({ accessToken });
      router.replace("/store/gifticon/management");
    } catch (err) {
      console.error(err);
    }
  };

  return {
    onSubmit: handleSubmit,
  };
};

export default useSignInApi;
