import React from 'react';

const InputField = ({ label, field, form: { touched, errors }, ...props }) => (
  <div>
    <h2>{label}</h2>
    <input type="text" {...field} {...props} />
  </div>
);

export default InputField;
