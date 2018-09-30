import React from 'react';

const InputField = ({ label, field, form: { touched, errors }, ...props }) => (
  <div>
    <h3>{label}</h3>
    <input type="text" {...field} {...props} />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
    <br />
  </div>
);

export default InputField;
