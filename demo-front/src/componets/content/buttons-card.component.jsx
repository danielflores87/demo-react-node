import React from "react";

function ButtonsCardComponent({ children, className, style }) {
  return (
    <div
      className={`mt-8 mb-2  flex flex-row justify-end gap-2 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default ButtonsCardComponent;
