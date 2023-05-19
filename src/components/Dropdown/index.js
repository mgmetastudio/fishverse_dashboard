import React, { useState, useEffect } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.sass";
import Icon from "../Icon";


const Dropdown = ({ className, setValue, empty }) => {
  const [visible, setVisible] = useState(false);
  const handleClick = (value) => {
    setValue(value);
    setVisible(false);
  };
  
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, { [styles.empty]: empty }, className, {
          [styles.active]: visible,
        })}
      >
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.selection}></div>
          <div className={styles.arrow}>
            <Icon name="arrow-bottom" size="10" />
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
