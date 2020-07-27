import React from "react";

const Button = ({ text, disabled, handleClick, style }) => {
  return (
    <button style={style} disabled={disabled} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
