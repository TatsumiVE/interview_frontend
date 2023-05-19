import React from "react";

export const  Button =({type, btnColor, onClick , text}) => {
 //const button = () => {
  return (
    <div>
      <button 
      type={type ? type : "button"}
      className={`"btn" btn-${btnColor}`}
      onClick={onClick} >
        {text}
      </button>
    </div>
  );
 //}
  
}

