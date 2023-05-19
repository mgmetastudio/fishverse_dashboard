import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./AccountInfo.module.sass";
import ReactTooltip from 'react-tooltip';
import { agentState, identityState } from "../../../atoms";
import { useRecoilState } from "recoil";
import { AuthClient } from "@dfinity/auth-client";
import { useHistory } from "react-router";
import { useFvsTokenBalance } from "../../../hooks/useFvsTokenBalance";
import { editSvg, expSvg } from "../../../constants/svg";
import { getHttpAgent } from "../../../functions/network";

const AccountInfo = () => {
  const [identity, setIdentity] = useRecoilState(identityState);
  const [agent, setAgent] = useRecoilState(agentState);
  let history = useHistory()

  const fvsTokenBalance = useFvsTokenBalance(agent);
  const username = localStorage.getItem('username')
  const formatedBalance = fvsTokenBalance.toString();

  const [usernameEdit, setUsernameEdit] = useState(username);
  const [error, setError] = useState(null);
  const guildName = localStorage.getItem('guild');

  const fvs = <img height="20" src="/images/FVS-coin.png" />
  const salt = <img height="20" src="/images/SALT-coin.png" />
  const fresh = <img height="20" src="/images/FRESH-coin.png" />
  
  const restoreIdentitySession = async () => {
      const authClient = await AuthClient.create();
      const restoredIdentity = authClient.getIdentity();
      let principal = restoredIdentity.getPrincipal().toText();

      if (principal.length == 63){
        const agent = await getHttpAgent({identity:restoredIdentity})
        setIdentity(restoredIdentity);
        setAgent(agent);
        localStorage.setItem("principal", principal);
      } else {
        localStorage.setItem("principal", "");
        history.push("/")
      }
}
  
  useEffect(() => {
    restoreIdentitySession();
  }, [])

  return (
    <div className={cn(styles.infoContainer)}>
      <h2 className={cn(styles.title)}>
        {guildName != 'None' ? <span className={styles.guild}>[ {guildName} ] </span> : null}
        {usernameEdit}
      </h2>
      <p className={styles.error}>{error}</p>
      <div className={cn(styles.container)}>
        <div className={cn(styles.levelBarContainer)}>
          <span className={cn(styles.level)}>Level 1</span>
          <div>
              <div className={cn(styles.levelBar)}></div>
              <p>{expSvg}<span>0</span> to next level</p>
          </div>
        </div>
        <div className={cn(styles.rewardContainer)}>
            <ReactTooltip place={"top"} />
            <div data-tip={"Next level reward: 0"} className={styles.tooltipMarker}>?</div>
        </div>
      </div>   
      <div className={cn(styles.container)}>
        <div className={cn(styles.walletAddress)}>
            <h5>{ identity ? 'DFINITY' : 'Not available' } address</h5>
            <p>{ identity ? identity.getPrincipal().toText() : 'Wallet is not connected' }</p>
        </div>
        <div className={cn(styles.balancesContainer)}>
          <div className={cn(styles.balance)}>
              <h5>FVS Balance</h5>
              <p>{fvs}{identity ? formatedBalance : "0.0"}</p>            
          </div>
          <div className={cn(styles.huntersBalance)}>
              <h5>SALT Balance</h5>
              <p>{salt}0.0</p>
          </div>
          <div className={cn(styles.huntersBalance)}>
              <h5>FRESH Balance</h5>
              <p>{fresh}0.0</p>
          </div>
        </div>
      </div>     
    </div>
  );
};

export default AccountInfo;