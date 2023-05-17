import cn from "classnames";
import styles from "./Tabs.module.sass";
import React, { useState } from 'react';
import EstTotalValue from "./AllTabs/FirstTab";
import LastDayProfit from "./AllTabs/SecondTab";
import CurrentRewards from "./AllTabs/ThirdTab";
 
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    setActiveTab("tab3");
  };
  return (
    <div className={cn(styles.tabsContainer)}>
      <ul className={cn(styles.tabsHeader)}>
        <li
          className={activeTab === "tab1" ? styles.activeTab : ""}
          onClick={handleTab1}
        >
          Est. total value
        </li>
        <li
          className={activeTab === "tab2" ? styles.activeTab : ""}
          onClick={handleTab2}
        >
          Last month profit
        </li>
        <li
          className={activeTab === "tab3" ? styles.activeTab : ""}
          onClick={handleTab3}
        >
          Claiming history & rewards
        </li>
      </ul>
 
      <div className={cn(styles.tabsBody)}>
        {activeTab === "tab1" ? <EstTotalValue /> : activeTab === "tab2" ? <LastDayProfit /> : <CurrentRewards />}
      </div>
    </div>
  );
};
export default Tabs;