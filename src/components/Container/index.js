import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Container.module.sass";


const Container = ({children}) => {


return (
          <div className={styles.container}>
              {children}
          </div>
      ); 
};

export default Container;