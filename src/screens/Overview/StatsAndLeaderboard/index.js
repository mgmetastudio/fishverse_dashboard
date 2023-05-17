import cn from "classnames";
import styles from "./StatsAndLeaderboard.module.sass";
import YourFriends from "../../../components/YourFriends";
import StatsTable from "../../../components/StatsTable";


const StatsAndLeaderboard = () => {
  return (
    <div className={cn("section", styles.section)}>
      <div className={styles.body}>
        <h3>Stats & Leaderboards</h3>
        <div className={cn("container", styles.container)}>
          <div className={cn("rewards", styles.rewards)}>
            <StatsTable />
          </div>
          <div className={styles.list}>
            <YourFriends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsAndLeaderboard;
