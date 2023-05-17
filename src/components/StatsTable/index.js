import React from "react";
import cn from "classnames";
import styles from "./Status.module.sass";

const StatsTable = ({ className }) => {
  return (
    <div className={cn(className, styles.container)}>
      <p>0 <span className={cn(className, styles.text)}>Daily tournaments won</span></p>
      <p>0 <span className={cn(className, styles.text)}>Weekly tournaments won</span></p>
      <p>0 <span className={cn(className, styles.text)}>Hours spent</span></p>
      <p>0 SALT <span className={cn(className, styles.text)}>Total reward</span></p>
    </div>
  );
};

export default StatsTable;
