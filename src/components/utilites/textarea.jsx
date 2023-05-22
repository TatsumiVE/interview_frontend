import React, { useState } from "react";

export const Textarea = ({labelName,name,onChange,placeholder}) => {

  return (
    <>
    <label>
      {labelName}
    <textarea
        name={name}
        onChange={onChange}
        placeholder={placeholder}
     > </textarea>
    </label>
     
    </>
  );
};


