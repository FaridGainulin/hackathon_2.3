import React from "react";
import styles from "./inputNew.module.css";

const InputNew = ({ placeholder, type, name, value, onChange }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className={styles.input}
      name={name}
      type={type}
    />
  );
};

export default InputNew;
