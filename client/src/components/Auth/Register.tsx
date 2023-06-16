import { useFormik } from "formik";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "@/App";
import { REGISTER_REJECTED } from "@/constants";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { registerSchema } from "@/schemas/auth";
import Button from "@CommonComponents/Button/Button";
import Input from "@CommonComponents/Input/Input";
import { registerUser } from "@Store/thunk/user";
import { ERoutes } from "@Types/routes";

import eye from "@Images/eye.svg";
import eyeSlash from "@Images/eye_slash.svg";

import styles from "./Auth.module.scss";

interface RegisterProps {
  toggleForms: () => void;
}

const Register: FC<RegisterProps> = ({ toggleForms }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { lightMode } = useContext(ThemeContext);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const passwordType = showPassword ? "text" : "password";
  const passwordImage = showPassword ? eyeSlash : eye;
  const confirmPasswordType = showConfirmPassword ? "text" : "password";
  const confirmPasswordImage = showConfirmPassword ? eyeSlash : eye;

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
      <label className={styles.label}>
        <Input
          type={confirmPasswordType}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <img
          className={styles.image}
          src={confirmPasswordImage}
          alt="Eye"
          onClick={toggleShowConfirmPassword}
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
        Already have an account? <span onClick={toggleForms}>Sign In</span>
      </p>
    </form>
  );
};

export default Register;
