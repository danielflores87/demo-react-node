import React from "react";

export function GridCardComponent({ children, className, style }) {
  return (
    <div
      className={`grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
