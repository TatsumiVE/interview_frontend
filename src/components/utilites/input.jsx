import React, { useState } from "react";

export const Input = ({labelName,type,name,placeholder,value,onChange}) => {
  const [text, setText] = useState("");

  return (
    <>
      <label>
        {labelName}
        <input
          className={name}
          type={type} 
          name={name}
          placeholder={placeholder}
          value={value}         
          onChange={onChange}         
        />        
      </label>
    </>
  );
};


