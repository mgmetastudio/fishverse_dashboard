import React from "react";
import cn from "classnames";
import styles from "./Form.module.sass";

const Form = ({
  className,
  big,
  onSubmit,
  placeholder,
  value,
  setValue,
  type,
  name,
  icon,
}) => {
  return (
    <form
      className={cn(className, styles.form, {
        [styles.big]: big,
      })}
      action=""
      onSubmit={onSubmit}
    >
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        placeholder={placeholder}
        required
      />
    </form>
  );
};

export default Form;
