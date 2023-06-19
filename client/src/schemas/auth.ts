import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Min 8 chars, 1 digit, 1 lowercase, 1 uppercase"
    )
    .required(),
});

export const registerSchema = loginSchema.shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required(),
});
