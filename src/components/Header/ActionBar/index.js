import styles from "./ActionBar.module.sass";
import Dropdown from "../../Dropdown"
import Notifications from "../../Notifications"


const ActionBar = (props) => {
  const loggedIn = localStorage.getItem('accessToken');

  return (
        <div className={styles.topSmallBar}>
          { loggedIn ? <Notifications className={styles.dropdown}/> : null }
        </div>
  );
};

export default ActionBar;