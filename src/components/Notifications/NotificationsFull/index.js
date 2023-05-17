import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./NotificationsFull.module.sass";
import Image from "../../Image";
import { Link } from "react-router-dom";
import { leaderBoardHistory } from "./../steam_codes"

const notifications = [
    
  ];

const Notifications = () => {
  return (
    <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
            <h4 className={cn("section", styles.responsiveHeader)}>Notifications</h4>
            <span className={styles.showAll}>Show all</span>
            <div className={styles.list}>
            {notifications.length > 0 ? notifications.map((x, index) => (
                    <div key={index} className={styles.notificationContainer}>
                        <div className={styles.picContainer}><Image
                            className={styles.pic}
                            src={x.src}
                            srcDark={x.src}
                            alt={x.title}
                        /></div>
                        <div className={styles.descriptionContainer}>
                            <h6>{x.title}</h6>
                            <p>{x.description}</p>
                            <div className={styles.buttonsContainer}>
                                <Link className={styles.link} to={x.link}><button className={styles.stakeBtn}>Click here</button></Link>
                            </div>
                        </div>
                    </div>
                )) : <div>No new notifications</div>}
            </div>
        </div>
    </div>
  );
};

export default Notifications;
