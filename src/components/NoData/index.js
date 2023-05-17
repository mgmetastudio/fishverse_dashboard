import React, {useState} from "react";
import cn from "classnames";
import styles from "./NoData.module.sass";


const NoData = ({ className, text }) => {
  return (
    <div className={cn("warning", styles.sectionWarning)}>
        <div className={cn(className, styles.container)}>
        <div className={cn(className, styles.symbol)}>!</div>
        <p>{ text }</p>
        </div>
    </div>
  );
};

export default NoData;
