import { FC, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import Login from "@Components/Auth/Login";
import Register from "@Components/Auth/Register";
import { ERoutes } from "@Types/routes";

const Auth: FC = () => {
  const { isAuth } = useAuth();

  const [showLogin, setShowLogin] = useState<boolean>(true);

  const toggleForms = () => {
    setShowLogin((prev) => !prev);
  };

  if (isAuth) {
    return <Navigate to={ERoutes.HOME} replace />;
  }

  return (
    <>
      {showLogin ? (
        <Login toggleForms={toggleForms} />
      ) : (
        <Register toggleForms={toggleForms} />
      )}
    </>
  );
};

export default Auth;
