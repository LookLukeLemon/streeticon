import { useState } from "react";

const useSignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (name === "name") {
      setName(e.target.value);
    } else if (name === "password") {
      setPassword(e.target.value);
    }
  };

  return {
    name,
    password,
    onChange: handleChange,
  };
};

export default useSignIn;
