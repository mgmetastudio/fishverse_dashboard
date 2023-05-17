import React from "react";
import cn from "classnames";
import styles from "./title.module.sass";

const Title = ({children}) => {
  return (
    <h3 className={styles.mainTitleStyle}>
      {children}
    </h3>
  );
};

export default Title;
