import cn from "classnames";
import styles from "./Main.module.sass";
import AccountInfo from "./AccountInfo"


const Main = () => {
  const avatar = localStorage.getItem('avatar');

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.hero}>
          <picture>
                <img src="/images/content/main-pic-2.jpg" alt="Main" />
          </picture>
        </div>
        <div className={styles.top}>
          <div className={styles.avatar}>
              <div className={styles.avatarInner}>
              {avatar != null && avatar != 'undefined'
                ? <img src={avatar} alt={avatarText} />
                : <span className={styles.avatarLetters}>FV</span> 
              }
              </div>
          </div>
          <AccountInfo />
        </div>
      </div>
    </div>
  );
};

export default Main;