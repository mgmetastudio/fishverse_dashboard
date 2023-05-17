import React from "react";
import cn from "classnames";
import styles from "./TextInput.module.sass";
import Icon from "../Icon";

const TextInput = ({ className, label, empty, view, ...props }) => {
  return (
    <div
      className={cn(
        styles.field,
        { [styles.empty]: empty },
        { [styles.view]: view },
        className
      )}
    >
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        <input className={styles.input} {...props} />
      </div>
    </div>
  );
};

export default TextInput;
