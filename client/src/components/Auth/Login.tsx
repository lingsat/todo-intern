import { useFormik } from "formik";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "@/App";
import { LOGIN_REJECTED } from "@/constants";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginSchema } from "@/schemas/auth";
import Button from "@CommonComponents/Button/Button";
import Input from "@CommonComponents/Input/Input";
import { loginUser } from "@Store/thunk/user";
import { ERoutes } from "@Types/routes";

import eye from "@Images/eye.svg";
import eyeSlash from "@Images/eye_slash.svg";

import styles from "./Auth.module.scss";

interface LoginProps {
  toggleForms: () => void;
}

const Login: FC<LoginProps> = ({ toggleForms }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { lightMode } = useContext(ThemeContext);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordType = showPassword ? "text" : "password";
  const passwordImage = showPassword ? eyeSlash : eye;

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
          type={passwordType}
          name="password"
          placeholder="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <img
          className={styles.image}
          src={passwordImage}
          alt="Eye"
          onClick={toggleShowPassword}
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
    </form>
  );
};

export default Login;
