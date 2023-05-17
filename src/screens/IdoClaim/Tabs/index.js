import cn from "classnames";
import styles from "./Tabs.module.sass";
import React, { useState } from 'react';
import EstTotalValue from "./AllTabs/FirstTab";
import LastDayProfit from "./AllTabs/SecondTab";
import Title from "../../../components/Title"
 
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  return (
    <div className={cn(styles.tabsContainer)}>
      <Title>FVS IDO participation</Title>
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
          Claiming history
        </li>
      </ul>
 
      <div className={cn(styles.tabsBody)}>
        {activeTab === "tab1" ? <EstTotalValue /> : <LastDayProfit />}
      </div>
    </div>
  );
};
export default Tabs;