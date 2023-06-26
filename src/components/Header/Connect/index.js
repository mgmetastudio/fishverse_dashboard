import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Connect.module.sass";
import { NavLink, useHistory } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { agentState, identityState, principalState } from "../../../atoms";
import { AuthClient } from "@dfinity/auth-client";
import { useRecoilState } from "recoil";
import useClipboard from "react-use-clipboard";
import PopUp from "../../Popup"
import { getHttpAgent, getInternetIdentityUrl } from "../../../functions/network";
import ReactLoading from 'react-loading';
import axios from "axios";
import { getApiConfig } from "../../../functions/api";
import { buf2hex } from "../../../functions/utils";


const Connect = (props) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const [restoreSession, setRestoreSession] = useState(localStorage.getItem("restoreSession") ?? "true");
  const [connectedChainId, setConnectedChainId] = useState('');
  const [identity, setIdentity] = useRecoilState(identityState);
  const [agent, setAgent] = useRecoilState(agentState);
  const [principal, setPrincipal] = useRecoilState(principalState);
  const loggedIn = localStorage.getItem('accessToken');

  const [mergeError, setMergeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isItsuccess, setIsItsuccess] = useState(false);

  const active = principal.length === 63 ? true : false;
  const iiUrl = getInternetIdentityUrl();
  const [isCopied, setCopied] = useClipboard(principal, {
    successDuration: 1000,
  });

  useEffect(() => {
    restoreIdentitySession();
  }, [])

  const restoreIdentitySession = async () => {
    if (restoreSession === "true") {
      const authClient = await AuthClient.create();
      const restoredIdentity = authClient.getIdentity();
      let principal = restoredIdentity.getPrincipal().toText();

      if (principal.length == 63) {
        const agent = await getHttpAgent({ identity: restoredIdentity })
        setIdentity(restoredIdentity);
        setAgent(agent);
        setPrincipal(principal);
        setConnectedChainId("Internet Identity")
        return true;
      }
    }
    return false;
  }

  const connectInternetIdentity = async e => {
    const identityRestored = await restoreIdentitySession();
    if (!identityRestored) {
      const authClient = await AuthClient.create();
      await new Promise((resolve, reject) => {
        authClient.login({
          identityProvider: iiUrl,
          onSuccess: resolve,
          onError: reject,
        });
      });

      const authIdentity = authClient.getIdentity();
      const agent = await getHttpAgent({ identity: authIdentity });

      setIdentity(authIdentity)
      setAgent(agent)
      setPrincipal(authIdentity.getPrincipal().toText())
      setConnectedChainId("Internet Identity")
      setRestoreSession(true);
      localStorage.setItem("restoreSession", "true")

      const merged_principal = localStorage.getItem('principal') ?? '';
      if (merged_principal.length !== 63) {
        setVisible3(true);
      }
    }
    setVisible(false)
  };

  const mergeAccount = async (e) => {
    setLoading(true);

    const encoder = new TextEncoder();
    const messageBuffer = encoder.encode(principal);
    const signature = await identity.sign(messageBuffer)
    const update = {
      "principal": principal,
      "signature": buf2hex(signature),
      "pub_key": buf2hex(identity.getPublicKey().toDer())
    };

    axios.put(`user/profile/`, update, getApiConfig()
    ).then((response) => {
      const data = response.data;
      setLoading(false);
      localStorage.setItem('principal', data.principal);
      setMergeError("Successfully merged with your wallet.");
      setIsItsuccess(true);
      window.location.reload();
    }).catch((error) => {
      const data = error.response.data;
      setLoading(false);
      setMergeError(data.non_field_errors);
      setIsItsuccess(false)
    });
  }

  const disconnect = () => {
    try {
      setConnectedChainId('');
      setIdentity(null)
      setAgent(null)
      setPrincipal("")
      setVisible(false)
      setVisible2(false)
      setRestoreSession(false);
      localStorage.setItem("restoreSession", "false")
    } catch (ex) {
      alert(ex);
    }
  };

  return (
    <>
      <PopUp visible={visible} onClose={() => setVisible(false)}>
        <div className={cn(styles.popContainer)}>
          <h4>Connect your wallet</h4>
          <div className={cn(styles.selectChain)}>

            <div className={cn(styles.radio)}>
              <label
                onClick={() => { connectInternetIdentity(); }}>
                <span className="checkmark">Internet Identity</span>
                <img src="/images/wallets/internet-identity.svg" alt="Main" />
                <input type="radio" name="chain" id="option2" autoComplete="off" />
              </label>
            </div>

          </div>
        </div>
      </PopUp>

      <PopUp visible={visible2} onClose={() => setVisible2(false)}>
        <div className={cn(styles.popContainer)}>
          <h4>Your wallet</h4>
          <div className={cn(styles.innerConnected)}>
            <p>{connectedChainId}</p>
            <button onClick={() => { disconnect(); }}>Disconnect</button>
          </div>
          <div className={cn(styles.innerWalletId)}>
            <p>{principal ? principal : "Wallet is not connected"}</p>
          </div>
          <div className={cn(styles.innerViewCopy)}>
            <span onClick={setCopied}>{isCopied ? "Copied" : "Copy address"}</span>
          </div>
        </div>
      </PopUp>

      <PopUp visible={visible3} onClose={() => { }}>
        <div className={cn(styles.popContainer)}>
          <h4>Merge your wallet</h4>
          <div className={cn(styles.selectChain)}>
            <p>In-game system can only detect your gaming NFTs if your wallet is merged to the dashboard, this will allow you to use NFT marketplace and NFT gaming equipment in the MetaShooter game.</p>
            {loading ? <ReactLoading width={30} className={styles.loaderIcon} /> : <p className={isItsuccess ? styles.successMessage2 : styles.errorMessage2}>{mergeError}</p>}
            <div className={cn(styles.radio)}>
              <label className={styles.mergeButtonContainer}
                onClick={mergeAccount}>
                <span className={styles.mergeButton}>Sign up (merge) your wallet</span>
                <input type="radio" name="chain" id="option2" autoComplete="off" />
              </label>
            </div>
          </div>
        </div>
      </PopUp>

      <NavLink
        className={cn("button-white", styles.buttonConnect)}
        to={ loggedIn ? '#' : '/' }
        onClick={active ? () => setVisible2(true) : () => setVisible(true)}>
        {active ? <span className={cn(styles.walletKey)}>{isMobile ? `${principal.substr(0, 3)}...${principal.substr(-1, 1)}` : `${principal.substr(0, 8)}...${principal.substr(-6, 6)}`}</span> : loggedIn ? <span>Connect</span> : <span>Log In</span>}
      </NavLink>
    </>
  );
};

export default Connect;