import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link, NavLink } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notifications.module.sass";
import { leaderBoardHistory } from "./steam_codes"

const NotificationsList = [
];

const Dropdown = ({ className, value, setValue, options, empty }) => {
  const [visible, setVisible] = useState(false);
  const [metamask, setMetamask] = useState(localStorage.getItem('metamask'));
  const email = localStorage.getItem('email');

  
  const yourCode = leaderBoardHistory.filter(e => e.email === email).length > 0 ? leaderBoardHistory.filter(e => e.email === email)[0].code : null;

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, { [styles.empty]: empty }, className, {
          [styles.active]: visible,
        })}
      >
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.selection}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.4088 12.7163C19.456 12.5749 19.503 12.41 19.5266 12.2686C19.668 11.7032 19.7386 11.1143 19.7386 10.5253C19.7386 9.32397 19.4795 8.19313 18.9377 7.10958C18.7964 6.82695 18.4429 6.68564 18.1603 6.85045C17.8777 6.99176 17.7599 7.34523 17.9012 7.62784C18.3488 8.52305 18.5608 9.51246 18.5608 10.5253C18.5608 11.0201 18.5136 11.5147 18.3958 12.0095C18.3723 12.1508 18.3251 12.2686 18.3016 12.3864C18.2075 12.6927 18.3958 13.0225 18.7021 13.1167C18.7493 13.1402 18.8199 13.1402 18.8671 13.1402C19.1026 13.1167 19.3145 12.9517 19.4089 12.7162L19.4088 12.7163Z" fill="white"/>
<path d="M4.56784 12.7162C4.6385 12.9753 4.87413 13.1401 5.13325 13.1401C5.18041 13.1401 5.25107 13.1401 5.29823 13.1166C5.60453 13.0225 5.79302 12.6927 5.69869 12.3864C5.65153 12.2686 5.62803 12.1273 5.60453 12.0094C5.48671 11.5146 5.43955 11.02 5.43955 10.5253C5.43955 9.51241 5.67519 8.54651 6.09915 7.62778C6.24047 7.34514 6.12265 6.99169 5.84001 6.85039C5.55738 6.70909 5.20393 6.82689 5.06262 7.10953C4.54436 8.16956 4.26172 9.32396 4.26172 10.5253C4.26172 11.1142 4.33238 11.7032 4.4737 12.2686C4.49719 12.4099 4.52069 12.5512 4.56785 12.7162L4.56784 12.7162Z" fill="white"/>
<path d="M11.9878 20.2309C12.9066 20.2309 13.6368 19.5007 13.6368 18.582L10.3389 18.5818C10.3389 19.5005 11.0691 20.2309 11.9878 20.2309V20.2309Z" fill="white"/>
<path d="M6.64115 10.2898V15.0484L5.4868 17.0272C5.36898 17.2157 5.36898 17.4276 5.4868 17.6161C5.58096 17.8046 5.7931 17.9224 6.00506 17.9224H18.0193C18.2313 17.9224 18.4197 17.8046 18.5375 17.6161C18.6317 17.4276 18.6317 17.2157 18.5375 17.0272L17.3832 15.0484V10.2898C17.3832 7.53363 15.2866 5.27213 12.6246 4.96589V4.58893C12.6246 4.25914 12.3655 4 12.0357 4C11.7059 4 11.4468 4.25914 11.4468 4.58893V4.96589C8.71407 5.27202 6.64107 7.53342 6.64107 10.2898H6.64115ZM13.0016 7.62782C13.1901 7.36868 13.5434 7.29802 13.8262 7.46284C14.7214 8.07528 15.2632 9.08833 15.2632 10.1718C15.2632 10.5016 15.0041 10.7608 14.6743 10.7608C14.3445 10.7608 14.0853 10.5016 14.0853 10.1718C14.0853 9.46508 13.732 8.82899 13.1666 8.42856C12.8838 8.26391 12.8131 7.88695 13.0016 7.62782L13.0016 7.62782Z" fill="white"/>
<path d="M3.1542 10.5018C3.1542 8.8763 3.60183 7.298 4.44989 5.90812C4.61488 5.62548 4.52055 5.27203 4.26142 5.10722C3.97878 4.94223 3.62533 5.03656 3.46051 5.29569C2.49462 6.85052 2 8.6643 2 10.5019C2 11.6326 2.18848 12.7398 2.56542 13.7998C2.65957 14.0354 2.87171 14.2002 3.13083 14.2002C3.20149 14.2002 3.27215 14.2002 3.31931 14.1767C3.62561 14.0589 3.79042 13.7291 3.67261 13.4228C3.31915 12.4805 3.15418 11.491 3.15418 10.5017L3.1542 10.5018Z" fill="white"/>
<path d="M19.8332 5.27208C19.5506 5.43706 19.4562 5.79034 19.6212 6.07299C20.3986 7.41584 20.8226 8.94698 20.8226 10.5018C20.8226 11.4912 20.6576 12.4805 20.3278 13.4229C20.21 13.7292 20.375 14.059 20.6811 14.1768C20.7518 14.2003 20.8224 14.2003 20.8696 14.2003C21.1052 14.2003 21.3407 14.059 21.435 13.7999C21.8119 12.7398 22.0004 11.6326 22.0004 10.5019C22.0004 8.73513 21.5293 6.99185 20.6341 5.48423C20.4693 5.20143 20.116 5.10711 19.8332 5.27209L19.8332 5.27208Z" fill="white"/>
</svg>

            <div className={NotificationsList.length > 0 ? styles.notificationsCount : null}>{NotificationsList.length > 0 ? NotificationsList.length : null}</div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.innerHeader}><h5>Notifications</h5> <span></span></div>
          {
            NotificationsList.map((x, index) => (
              <div key={index} className={styles.notificationBody}>{x.title}<NavLink
              className={cn("link-green", styles.link)}
              to={x.link}
            >Click here
            </NavLink></div>
            ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
