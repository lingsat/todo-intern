import { FC, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import Loading from "@CommonComponents/Loading/Loading";
import Login from "@Components/Auth/Login";
import Register from "@Components/Auth/Register";
import { ERoutes } from "@Types/routes";

import styles from "./Authentication.module.scss";

const Auth: FC = () => {
  const { isAuth, isLoading } = useAuth();

  const [showLogin, setShowLogin] = useState<boolean>(true);

  const toggleForms = () => {
    setShowLogin((prev) => !prev);
  };

  if (isAuth) {
    return <Navigate to={ERoutes.HOME} replace />;
  }

  return (
    <div className={styles.wrapper}>
      {showLogin ? (
        <Login toggleForms={toggleForms} />
      ) : (
        <Register toggleForms={toggleForms} />
      )}
      {isLoading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Auth;
