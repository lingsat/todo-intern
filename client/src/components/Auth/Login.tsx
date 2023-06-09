import { useFormik } from "formik";
import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "@/App";
import { LOGIN_REJECTED } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/schemas/auth";
import Button from "@CommonComponents/Button/Button";
import Input from "@CommonComponents/Input/Input";
import Loading from "@CommonComponents/Loading/Loading";
import { AppDispatch } from "@Store/store";
import { loginUser } from "@Store/thunk/user";
import { ERoutes } from "@Types/routes";

import styles from "./Auth.module.scss";

interface LoginProps {
  toggleForms: () => void;
}

const Login: FC<LoginProps> = ({ toggleForms }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { lightMode } = useContext(ThemeContext);
  const { isLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }, actions) => {
      dispatch(loginUser({ email, password })).then((action) => {
        if (action.type !== LOGIN_REJECTED) {
          navigate(ERoutes.HOME);
          actions.resetForm();
        }
      });
    },
  });

  return (
    <form
      className={`${styles.auth} ${!lightMode && styles.dark}`}
      onSubmit={formik.handleSubmit}>
      <h2 className={styles.title}>Login</h2>
      <label className={styles.label}>
        <Input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className={`${styles.error} ${!lightMode && styles.dark}`}>
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : ""}
        </p>
      </label>
      <label className={styles.label}>
        <Input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className={`${styles.error} ${!lightMode && styles.dark}`}>
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ""}
        </p>
      </label>
      <Button
        text="Sign In"
        type="submit"
        disabled={!(formik.dirty && formik.isValid)}
      />
      <p className={styles.message}>
        Don&apos;t have an account? <span onClick={toggleForms}>Sign Up</span>
      </p>
      {isLoading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
    </form>
  );
};

export default Login;
