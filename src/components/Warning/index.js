import React, {useState, useEffect} from "react";
import cn from "classnames";
import styles from "./Warning.module.sass";


const Warning = ({ className = ""}) => {
  const initialState = localStorage.getItem('isWalletConnected');
  const [loggedInName, setLoggedInName] = useState(initialState);

  useEffect(() => {
    const checkOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
          setLoggedInName(true);
        } else {
          setLoggedInName(false);
        }
      }
    checkOnPageLoad()
  }, [])

  return (
    <div className={cn("warning", styles.sectionWarning)}>
        <div className={styles.container}>
        <div className={styles.symbol}>!</div>
          { !loggedInName ? <p>Thanks for joining our community! Dashboard is currently under development. By this time, check more information on our website</p> : <p>Welcome Fishers, referral, promotions, giveaways and much more coming soon to fishing verse. Stay focus and don't miss your life fish!</p> }
          <div className={styles.connect}><a href="https://thefishverse.com/" target="_blank">Visit website</a>
        </div>
      </div>
    </div>
  );
};

export default Warning;
