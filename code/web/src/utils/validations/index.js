import * as yup from 'yup';

const validationSchema = yup.object().shape({
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
    .required('Institution is required!'),
  orcid: yup
    .mixed()
    .test('orcid-is-valid', 'ORCID number is not valid!', string => {
      // https://support.orcid.org/hc/en-us/articles/360006897674-Structure-of-the-ORCID-Identifier
      // 0000-0003-1415-9269 é valido
      string = string.trim();
      if (string.length !== 19) return false;
      let total = 0;
      let value = string.replace(/\-/g, '');
      for (let i = 0; i < value.length - 1; i++) {
        let digit = parseInt(value[i], 10);
        total = (total + digit) * 2;
      }
      let remainder = total % 11;
      let result = (12 - remainder) % 11;
      if (result == 10) return value[value.length - 1].uppercase() == 'X';
      else return value[value.length - 1] == result.toString();
    })
    .required('ORCID number is required!'),
});

export default validationSchema;
