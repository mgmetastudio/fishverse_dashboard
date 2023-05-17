import React from "react";
import cn from "classnames";
import styles from "./ComingSoon.module.sass";
import Title from "../Title"



const ComingSoon = ({ className, text }) => {
  const icon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 23.9999C8.81743 23.9999 5.76534 22.7356 3.51471 20.4852C1.26432 18.2346 0 15.1822 0 12C0 8.81773 1.26427 5.76531 3.51471 3.51469C5.76529 1.26432 8.81777 0 12 0C15.1822 0 18.2347 1.26427 20.4853 3.51469C22.7357 5.76526 24 8.81773 24 12C24 14.1065 23.4455 16.1757 22.3923 18C21.339 19.8243 19.8243 21.339 18 22.3923C16.1756 23.4455 14.1064 24 11.9999 24L12 23.9999ZM12 20.5713C12.4546 20.5713 12.8907 20.3907 13.2123 20.0693C13.5337 19.7477 13.7143 19.3116 13.7143 18.857C13.7143 18.4024 13.5337 17.9664 13.2123 17.6448C12.8906 17.3233 12.4546 17.1427 12 17.1427C11.5454 17.1427 11.1093 17.3233 10.7877 17.6448C10.4663 17.9664 10.2857 18.4024 10.2857 18.857C10.2857 19.3116 10.4663 19.7477 10.7877 20.0693C11.1094 20.3907 11.5454 20.5713 12 20.5713ZM12 15.4284C12.9498 15.4284 13.7143 14.6639 13.7143 13.7141V5.14268C13.7143 4.19291 12.9498 3.42839 12 3.42839C11.0502 3.42839 10.2857 4.19291 10.2857 5.14268V13.7141C10.2857 14.6639 11.0502 15.4284 12 15.4284Z" fill="white"/>
  </svg>  

  return (
    <div className={styles.sectionComing}>
      <Title>{text}</Title>
      <div className={styles.sectionInner}>
          <div className={cn(className, styles.containerComing)}>
            {icon}
            <div className={styles.innerContainer}>
              <h5>No access to this page</h5>
              <p>Our developement team are working on this page. It will be live soon. Feeling borded?<br/> Test our The Fishverse Alpha game version & earn some $FISHERS coins.</p>
              <a href="https://store.steampowered.com/" className={styles.downloadGameButton}>Download The Fishverse now</a>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ComingSoon;
