import { useFormik } from "formik";
import { FC, useContext } from "react";

import { ThemeContext } from "@/App";
import Button from "@CommonComponents/Button/Button";
import Input from "@CommonComponents/Input/Input";
import styles from "@Pages/Auth/Auth.module.scss";

interface RegisterProps {
  toggleLoginMode: () => void;
}

const Register: FC<RegisterProps> = ({ toggleLoginMode }) => {
  const { lightMode } = useContext(ThemeContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    // validationSchema: registerUserSchema,
    onSubmit: ({ email, password }, actions) => {
      console.log(email, password);
      actions.resetForm();
    },
  });

  return (
    <form
      className={`${styles.auth} ${!lightMode && styles.dark}`}
      onSubmit={formik.handleSubmit}>
      <h2 className={styles.title}>Register</h2>
      <label className={styles.label}>
        <Input
          type="email"
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
      <label className={styles.label}>
        <Input
          type="password"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className={`${styles.error} ${!lightMode && styles.dark}`}>
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ""}
        </p>
      </label>
      <Button text="Sign up" type="submit" />
      <p className={styles.message}>
        Have already an account?{" "}
        <button
          className={`${styles.button} ${!lightMode && styles.dark}`}
          onClick={toggleLoginMode}>
          Sign in
        </button>
      </p>
    </form>
  );
};

export default Register;
