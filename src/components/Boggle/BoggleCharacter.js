import React from "react";

const BoggleCharacter = ({ char, row, col, isSelected, isLast, handleClick, style }) => {
  style = {
    borderColor: isLast ? "pink" : isSelected ? "blue" : "black",
    opacity: isSelected ? "0.60" : "1.0",
    ...style
  };

  return (
    <div style={style} onClick={() => handleClick(row, col)}>
      {char}
    </div>
  );
};

export default BoggleCharacter;
