import styles from "./ActionBar.module.sass";
import Dropdown from "../../Dropdown"
import Notifications from "../../Notifications"


const ActionBar = (props) => {
  const loggedIn = localStorage.getItem('accessToken');

  return (
        <div className={styles.topSmallBar}>
          { loggedIn ? <Dropdown
                className={styles.dropdown}
                value={date}
                setValue={setDate}
                options={dateOptions}
            /> : null }
          { loggedIn ? <Notifications
                className={styles.dropdown}
                value={date}
                setValue={setDate}
                options={dateOptions}
            /> : null }
        </div>
  );
};

export default ActionBar;