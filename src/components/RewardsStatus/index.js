import cn from "classnames";
import styles from "./Status.module.sass";
import { Link } from "react-router-dom";
import Title from "../Title"
import Button from "../../components/Button"
import { useRecoilValueLoadable } from "recoil";
import { walletState } from "../../atoms";

const RewardsStatus = ({ className }) => {
  let wallet = [];
  let walletLoadable = useRecoilValueLoadable(walletState);
  if (walletLoadable.state === 'hasValue') {
    wallet = walletLoadable.contents;
  } else if (walletLoadable.state === 'hasError') {
    console.log("Got recoil walletState error", walletLoadable);
  }

  const legendaryCount = wallet.filter(v => v.rarity === "Legendary").length;
  const epicCount = wallet.filter(v => v.rarity === "Epic").length;
  const commonCount = wallet.filter(v => v.rarity === "Common").length;

  return (
    <div className={cn(className, styles.row)}>
    <Title>NFTs</Title>
    <div className={cn(className, styles.rowInner)}>
      <div className={cn('progress-bar-container', styles.progressbarcontainer)}>
        <div className={cn('progress-bar-inner', styles.progressbarinner)}>
          <div className={styles.rowForItems}><p className={styles.legendaryBubble}>{legendaryCount}<span>Legendary</span></p></div>
        </div> 
        <div className={cn('progress-bar-inner', styles.progressbarinner)}>
          <div className={styles.rowForItems}><p className={styles.epicBubble}>{epicCount}<span>Epic</span></p></div>
        </div>
        <div className={cn('progress-bar-inner', styles.progressbarinner)}>
          <div className={styles.rowForItems}><p className={styles.commonBubble}>{commonCount}<span>Common</span></p></div>
        </div>
      </div>
      <Link className={styles.link} to="/wallet">
        <Button>See all NFTs</Button>
      </Link>
    </div>
  </div>
  );
};

export default RewardsStatus;