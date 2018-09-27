import React from 'react';

const InputField = ({ label, field, form: { touched, errors }, ...props }) => (
  <div>
    <label>{label}</label>
    <input type="text" {...field} {...props} />
    <br/>
  </div>
);

export default InputField;