import {
  createContext,
  SetStateAction,
  Dispatch,
  useState,
  ReactNode,
} from "react";

export type AuthTokenType = {
  accessToken: string;
};

export type AuthContextType = {
  auth: AuthTokenType | null;
  setAuth: Dispatch<SetStateAction<AuthTokenType | null>>;
};
const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthTokenType | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
