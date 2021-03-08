import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .email("Not a valid email")
    .max(50, 'must be less than 50 characters')
    .required("email is required"),
  password: yup
    .string()
    .required("username is required")
    .min(4, "Must be at least 4 characters")
    .max(16),
});
