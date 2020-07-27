import React from "react";

const Text = ({ text, style }) => {
  if (Array.isArray(text)){
    return (
      <div style={style}>
        {text.map((txt) => <h2>{txt}</h2>)}
      </div>
    );
  }

  return (
    <div style={style}>
      <h2>{text}</h2>
    </div>
  );
};

export default Text;
