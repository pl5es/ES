import React from 'react';

const InputField = ({
  label,
  field,
  labelClass,
  form: { touched, errors },
  ...props
}) => (
  <div>
    <div className={labelClass}>{label}</div>
    <input {...field} {...props} />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
    <br />
  </div>
);

export default InputField;
