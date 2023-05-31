import React, { useState } from "react";

export const TextArea = ({ labelName, name, onChange, placeholder,className,text,errorMessage }) => {

  return (
    <div className="textarea-input">
      <label>
        {labelName} <span className="txt-danger">{errorMessage}</span>
      </label>
      <textarea
        name={name}
        onChange={onChange}  
        placeholder={placeholder}
        className={className}
      >{text}</textarea>
    </div>
  );
};


