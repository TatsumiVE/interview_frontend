import React from "react";

export const InputCheckbox = ({
  labelName,
  type,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <div className="checkbox-input">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      &nbsp;
      <label>{labelName}</label>
    </div>
  );
};
