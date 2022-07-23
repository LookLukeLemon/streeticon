import axios from "axios";
import { useRouter } from "next/router";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

  const refresh = async () => {
    try {
      const response = await axios.get("/api/auth/user/refresh", {
        withCredentials: true,
      });

      setAuth((prev) => {
        return {
          ...prev,
          accessToken: response.data.access_token,
        };
      });

      return response.data.access_token;
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/user/sign-in");
      } else {
        throw err;
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
