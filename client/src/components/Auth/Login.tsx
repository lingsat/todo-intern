import { useFormik } from "formik";
import { FC, useContext } from "react";

import { ThemeContext } from "@/App";
import { loginSchema } from "@/schemas/auth";
import Button from "@CommonComponents/Button/Button";
import Input from "@CommonComponents/Input/Input";
import { useStoreDispatch } from "@Store/store";
import { loginAsyncAction } from "@Store/thunk/user";

import styles from "./Auth.module.scss";

interface LoginProps {
  toggleLoginMode: () => void;
}

const Login: FC<LoginProps> = ({ toggleLoginMode }) => {
  const { lightMode } = useContext(ThemeContext);
  const dispatch = useStoreDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }, actions) => {
      dispatch(loginAsyncAction({ email, password }));
      actions.resetForm();
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
        Don&apos;t have an account?{" "}
        <button
          className={`${styles.button} ${!lightMode && styles.dark}`}
          onClick={toggleLoginMode}>
          Sign up
        </button>
      </p>
    </form>
  );
};

export default Login;
