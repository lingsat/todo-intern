import { FC, useState } from "react";

import Login from "@Components/Login/Login";
import Register from "@Components/Register/Register";

const Auth: FC = () => {
  const [loginMode, setLoginMode] = useState<boolean>(true);

  const toggleLoginMode = () => {
    setLoginMode((prev) => !prev);
  };

  return (
    <>
      {!loginMode ? (
        <Login toggleLoginMode={toggleLoginMode} />
      ) : (
        <Register toggleLoginMode={toggleLoginMode} />
      )}
    </>
  );
};

export default Auth;
