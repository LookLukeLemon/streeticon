import { useContext, useDebugValue } from "react";
import AuthContext, { AuthContextType } from "../context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext<AuthContextType>(AuthContext);

  useDebugValue(auth, (auth) => {
    return auth?.accessToken ? "Logged In" : "Logged Out";
  });
  return useContext(AuthContext);
};

export default useAuth;
