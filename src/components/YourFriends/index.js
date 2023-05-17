import React from "react";
import cn from "classnames";
import styles from "./Status.module.sass";

const friends = [

];

const YourFriends = ({ className }) => {
  return (
    <div className={cn(className, styles.friends)}>
      <h4>Your friends</h4>
      <div className={cn(className, styles.friendslist)}>
      <table>
        <tr className={cn(styles.tabletitles)}>
          <th>Rank</th>
          <th>Player</th>
          <th>XP gained</th>
        </tr>
        { friends.length != 0 ? friends.map((x, index) => (
          <tr className={styles.item} key={index}>
            <td className={styles.rank}>{x.rank}</td>
            <td className={styles.player}>
                <img src={x.avatar} alt="Player avatar" />
                <span>{x.name}</span>
            </td>
            <td>{x.exp}</td>
          </tr>
          )) : <div><p>You don not have any friends yet.</p></div>}
      </table>




      </div>
    </div>
  );
};

export default YourFriends;
