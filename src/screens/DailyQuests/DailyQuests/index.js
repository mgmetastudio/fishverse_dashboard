import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./DailyQuests.module.sass";
import Title from "../../../components/Title"
import Count from "./Count";
import axios from "axios";


const DailyQuests = () => {
  const [dailyLoginStreak, setDailyLoginStreak ]= useState(1);
  const hunter = <img height="24" src="/images/fisher-coin.png" />
  const claimed = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#0D5590"/>
  <path d="M6 11.5L10 15.5L17.5 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
  const pending = <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12.5" cy="12" r="12" fill="#EBEBEB" fill-opacity="0.7"/>
  <circle cx="12.5" cy="12" r="5" fill="#FAFAFA"/>
  </svg>
  
  function GiveMeThisMonthDays() {
    var now = new Date();
    var days = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    var daysArray = [];
    while (days > 0) {
      if(days === 1) {
        daysArray.push({"day": days, "reward": 5});
      } else if(days === 7) {
        daysArray.push({"day": days, "reward": 15});
      } else if(days === 14) {
        daysArray.push({"day": days, "reward": 10});
      } else if(days === 17) {
        daysArray.push({"day": days, "reward": 10});
      } else if(days === 24) {
        daysArray.push({"day": days, "reward": 10});
      } else if(days === 27) {
        daysArray.push({"day": days, "reward": 15});
      } else if(days === 31) {
        daysArray.push({"day": days,  "reward": 'Random Epic NFT'});
      } else {
        daysArray.push({"day": days,  "reward": 5});
      }
      days--;
    }
    daysArray.reverse();

    for (let i = 0; i < daysArray.length; i++) {
      if (dailyLoginStreak + 1 > i){
        daysArray[i]['claimed'] = true;
      }
    }
    return daysArray
  }
  const days = GiveMeThisMonthDays();
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <Title>Daily quests <sup className={styles.comingsoon}> Coming soon</sup></Title>
        <div className={styles.containerInnerWrapper}>
          <h4>Daily check-in challenge</h4>
          <p>You need to have any The FishVerse NFT in your wallet to be eligible to participate in Daily login challenge.</p>
          <div className={styles.freeHunters}>
            <p>Daily free FVS points</p>
            <span>+5 FVS {hunter}</span>
          </div>
          <button className={styles.rewardClaimButton}>Event starts in <Count /></button>
          <div className={styles.daysContainer}>
            {days.map((day, index) => (
              <div className={styles.dayContainer} key={index}>
                  {day.reward > 5 || typeof(day.reward) == 'string' ? <div className={typeof(day.reward) != 'string' ? styles.reward : styles.rewardText}>{typeof(day.reward) == 'string' ? null : hunter}{day.reward}</div> : null}
                  <div className={styles.claimingStatus}>{day.claimed == true ? claimed : pending}</div>
                  <span className={styles.rewardDay}>Day {day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuests;
