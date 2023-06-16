import { useFormik } from "formik";
import { FC, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "@/App";
import { REGISTER_REJECTED } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema } from "@/schemas/auth";
import Button from "@CommonComponents/Button/Button";
import Input from "@CommonComponents/Input/Input";
import Loading from "@CommonComponents/Loading/Loading";
import { AppDispatch } from "@Store/store";
import { registerUser } from "@Store/thunk/user";
import { ERoutes } from "@Types/routes";

import styles from "./Auth.module.scss";

interface RegisterProps {
  toggleForms: () => void;
}

const Register: FC<RegisterProps> = ({ toggleForms }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { lightMode } = useContext(ThemeContext);
  const { isLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: ({ email, password }, actions) => {
      dispatch(registerUser({ email, password })).then((action) => {
        if (action.type === REGISTER_REJECTED) {
          toggleForms();
        } else {
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
      <h2 className={styles.title}>Create Account</h2>
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
      <label className={styles.label}>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className={`${styles.error} ${!lightMode && styles.dark}`}>
          {formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : ""}
        </p>
      </label>
      <Button
        text="Sign Up"
        type="submit"
        disabled={!(formik.dirty && formik.isValid)}
      />
      <p className={styles.message}>
        Already have an account? <span onClick={toggleForms}>Sing In</span>
      </p>
      {isLoading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
    </form>
  );
};

export default Register;
