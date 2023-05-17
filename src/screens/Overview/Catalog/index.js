import cn from "classnames";
import styles from "./Catalog.module.sass";
import RewardStatus from "../../../components/RewardsStatus";
import StakingStats from "../../../components/StakingStats";


const Catalog = () => {
  return (
    <div className={cn("section", styles.section)}>
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          <div className={cn("rewards", styles.rewards)}>
            <RewardStatus />
          </div>
          <div className={styles.statistics}>
            <StakingStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
