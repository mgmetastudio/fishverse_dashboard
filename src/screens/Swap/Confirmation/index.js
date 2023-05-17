import React, {useState} from "react";
import styles from "./Confirmation.module.sass";
import Popup from "./Popup/index"
import ReactLoading from 'react-loading';

const Verify = (props) => {
    const rejected = <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#F01414"/>
    <path d="M18.1016 37.9854L37.9006 18.1864" stroke="white" strokeWidth="2.54545" strokeLinecap="round"/>
    <path d="M18.1016 18.1869L37.9006 37.9859" stroke="white" strokeWidth="2.54545" strokeLinecap="round"/>
    </svg>
    const approved = <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#B7F014"/>
    <path d="M14 26.3028L24.3939 36.6968L42 19.0907" stroke="black" strokeWidth="2.54545" strokeLinecap="round"/>
    </svg>
    

    return (
        <Popup visible={props.setVisibleConfirm}>
            <div className={styles.sectionVerify}>
                <h4>Confirm swap</h4>
                <div className={styles.container}>
                    {props.swapConfirmed === null ?<div className={styles.loadingVerify}><ReactLoading width={40} className={styles.loaderIcon} /></div> : null}
                    {props.swapConfirmed === null ? null : props.swapConfirmed ? <div className={styles.loadingVerify}>{approved}</div> : !props.swapConfirmed ? <div className={styles.loadingVerify}>{rejected}</div> : null}
                    {props.swapConfirmed === null ? null : props.swapConfirmed ? <span className={styles.transaction}>Transaction approved</span> : !props.swapConfirmed ? <span className={styles.transaction}>Transaction rejected</span> : null}
                    {props.swapConfirmed === null ? <p className={styles.waiting}>Waiting for confirmation</p> : null}
                    {props.swapConfirmed === null ? <p className={styles.swaping}>{props.swapping}</p> : null}
                    {props.swapConfirmed === null ? <p>Confirm this transaction  in your wallet</p> : null}
                    {props.swapConfirmed === null ? <button className={styles.swapButton}>Waiting for approval</button> : null }
                </div>
            </div>
        </Popup>
  );
};

export default Verify;