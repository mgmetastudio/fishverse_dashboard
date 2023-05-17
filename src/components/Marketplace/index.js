import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Adventure.module.sass";


const Marketplace = () => {

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.abovebc}>
          <div className={styles.totalunlocked}>
          <span>0</span> / <span>244</span> Unlocked
          </div>
        </div>
        <div className={styles.breadcrumb}>
          <div className={styles.colected}>
            <span className={styles.liststyle}></span>
            <span className={styles.colectedcount}>0/1</span>
            <span className={styles.itemrarity}>Legendary</span>
          </div>
          <div className={styles.colected}>
            <span className={styles.liststyle}></span>
            <span className={styles.colectedcount}>0/1</span>
            <span className={styles.itemrarity}>Epic</span>
          </div>
          <div className={styles.colected}>
            <span className={styles.liststyle}></span>
            <span className={styles.colectedcount}>0/1</span>
            <span className={styles.itemrarity}>Common</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
