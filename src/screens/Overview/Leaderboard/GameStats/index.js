import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./GameStats.module.sass";
import Title from "../../../../components/Title"
import Container from "../../../../components/Container"


const GameStats = () => {
  const live = <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="4" cy="4" r="4" fill="#6FCF97"/>
  </svg>

return (
          <div className={cn(styles.container)}>
            <div>
              <Title>FishVerse game stats</Title>
            </div>
            <div className={styles.containerInner}>
              <div className={styles.liveRow}>
                  <span>{live} Live</span>
              </div>
                <div className={styles.containerInnerWrap}>

                <div className={styles.InnerRow}><span>Today</span></div>
                <div className={styles.InnerContainerWrapper}>
                  <div className={styles.InnerInfoWrapper}>
                    <span className={styles.innerNumber}>0</span>
                    <span className={styles.innerText}>Missions played today</span>
                  </div>
                  <div className={styles.InnerInfoWrapper}>
                  <span className={styles.innerNumber}>0</span>
                    <span className={styles.innerText} >Fish caught today</span>
                  </div>
                </div>
                <div className={styles.InnerRow}><span>From Dec 21, 2022</span></div>
                <div className={styles.InnerContainerWrapper}>
                  <div className={styles.InnerInfoWrapper}>
                    <span className={styles.innerNumber}>0</span>
                    <span className={styles.innerText}>Total missions played</span>
                  </div>
                  <div className={styles.InnerInfoWrapper}>
                    <span className={styles.innerNumber}>0</span>
                    <span className={styles.innerText}>Total fish caught</span>
                  </div>
                </div>
                <div className={styles.InnerRow}><span>Last updated: ...</span></div>

            </div>
            </div>
          </div>
      ); 
};

export default GameStats;