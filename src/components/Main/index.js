import cn from "classnames";
import styles from "./Main.module.sass";
import AccountInfo from "./AccountInfo"


const Main = () => {
  const avatar = localStorage.getItem('avatar') ?? "null";

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
              {avatar != null && avatar != 'null'
                ? <img src={avatar}/>
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