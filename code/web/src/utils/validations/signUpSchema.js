import * as yup from 'yup';

const signUpSchema = yup.object().shape({
  username: yup.string().required('Username is required!'),
  email: yup
    .string()
    .email('E-mail is not valid!')
    .max(50, 'E-mail address too long!')
    .required('E-mail is required!'),
  password: yup
    .string()
    .min(6, 'Password has to be longer than 6 characters!')
    .max(50, 'Password too long!')
    .required('Password is required!'),
  name: yup
    .string()
    .max(50, 'Name too long!')
    .required('Name is required!'),
  research_area: yup
    .string()
    .max(50, 'Name too long!')
    .required('Research Area is required!'),
  institution: yup
    .string()
    .max(50, 'Name too long!')
    .required('Institution is required!')
})

export default signUpSchema;
