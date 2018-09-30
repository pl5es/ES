import React from 'react';

const InputField = ({ label, field, form: { touched, errors }, ...props }) => (
  <div>
<<<<<<< HEAD
    <h3>{label}</h3>
    <input type="text" {...field} {...props} />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
    <br />
=======
    <h2>{label}</h2>
    <input type="text" {...field} {...props} />
>>>>>>> 54a0bcc9f4c1a5d529918e8102fa95f3202d4740
  </div>
);

export default InputField;
