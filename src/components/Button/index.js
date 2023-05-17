import React from "react";
import cn from "classnames";
import styles from "./button.module.sass";

const Button = ({children}) => {
  return (
    <button className={styles.buttonMain}>
      {children}
    </button>
  );
};

export default Button;
