import { FC, useState } from "react";

import Login from "@Components/Auth/Login";
import Register from "@Components/Auth/Register";

const Auth: FC = () => {
  const [loginMode, setLoginMode] = useState<boolean>(true);

  const toggleLoginMode = () => {
    setLoginMode((prev) => !prev);
  };

  return (
    <>
      {loginMode ? (
        <Login toggleLoginMode={toggleLoginMode} />
      ) : (
        <Register toggleLoginMode={toggleLoginMode} />
      )}
    </>
  );
};

export default Auth;
