import React from "react";
import styles from "./buttonNew.module.css";

const ButtonNew = ({ children, onClick, className, color, style }) => {
  const colorClass = [
    color === "red" ? styles.red : "",
    color === "green" ? styles.green : "",
    color === "blue" ? styles.blue : "",
  ].join(" ");

  return (
    <button
      style={style}
      className={`${colorClass}  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonNew;
