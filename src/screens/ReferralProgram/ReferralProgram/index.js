import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./ReferralProgram.module.sass";
import ComingSoon from "../../../components/ComingSoon"
import Container from "../../../components/Container"
import Title from "../../../components/Title"
import useClipboard from "react-use-clipboard"

const ReferralProgram = () => {
  const mhunt = <img height="20" src="/images/mhunt-token.png" />
  const copy = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.0177 3.33398H8.35114C7.91373 3.33398 7.49416 3.50923 7.18483 3.82115C6.87551 4.13308 6.70172 4.55622 6.70172 4.99742V6.61761H4.98788C4.55109 6.61641 4.13178 6.79 3.82173 7.10028C3.51166 7.4104 3.33636 7.83203 3.33398 8.27234V15.0039C3.33518 15.4447 3.50927 15.8672 3.81844 16.1788C4.12746 16.4906 4.54646 16.6661 4.98356 16.6673H11.6502C12.0876 16.6673 12.5071 16.4921 12.8165 16.1802C13.1258 15.8682 13.2996 15.4451 13.2996 15.0039V13.3837H15.0134C15.4502 13.3849 15.8695 13.2113 16.1796 12.901C16.4896 12.5909 16.6649 12.1693 16.6673 11.729V4.99742C16.6661 4.55665 16.492 4.13412 16.1829 3.8225C15.8738 3.51073 15.4548 3.33517 15.0177 3.33398ZM11.9801 14.9994L11.98 14.9996C11.98 15.1833 11.8323 15.3321 11.6502 15.3321H4.98356C4.80229 15.3299 4.656 15.1822 4.65361 14.9996V8.27226C4.65361 8.08857 4.8014 7.93954 4.98356 7.93954H11.6502C11.738 7.93848 11.8226 7.97314 11.8846 8.03583C11.9468 8.09836 11.9812 8.18365 11.98 8.27226V15.0038L11.9801 14.9994ZM15.3477 11.7289C15.3477 11.9126 15.1999 12.0616 15.0177 12.0616H13.3039V8.27237C13.3039 7.8313 13.1301 7.40819 12.8208 7.09627C12.5115 6.78419 12.0919 6.60893 11.6543 6.60893H8.02119V4.99749C8.02119 4.81381 8.16883 4.66477 8.35099 4.66477H15.0176C15.1989 4.66719 15.3451 4.81471 15.3475 4.99749L15.3477 11.7289Z" fill="0D5590"/>
  </svg>
  const hunter = <img height="40" src="/images/fisher-coin.png" />
  const twitter = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.54755 21.716C16.6042 21.716 21.5578 14.44 21.5578 8.1303C21.5578 7.92361 21.5578 7.71786 21.5434 7.51307C22.507 6.83716 23.3389 6.00024 24 5.04152C23.1014 5.42785 22.148 5.68109 21.1718 5.79277C22.1999 5.1961 22.9691 4.25752 23.3366 3.15178C22.3701 3.708 21.3126 4.09997 20.2099 4.31076C19.4675 3.54525 18.4856 3.03836 17.4162 2.86851C16.3468 2.69867 15.2494 2.87533 14.2939 3.37117C13.3385 3.86701 12.5782 4.65439 12.1307 5.61146C11.6833 6.56853 11.5735 7.64194 11.8186 8.66557C9.86092 8.5703 7.94573 8.07699 6.19745 7.21752C4.44915 6.35808 2.90677 5.15173 1.6704 3.67681C1.04073 4.72795 0.847875 5.9723 1.1311 7.15649C1.41433 8.3407 2.15234 9.37568 3.19488 10.0507C2.41124 10.0285 1.64464 9.82346 0.96 9.45306V9.51357C0.960307 10.616 1.35385 11.6843 2.07387 12.5375C2.79389 13.3906 3.79606 13.9759 4.9104 14.1942C4.18548 14.3859 3.42488 14.414 2.68704 14.2761C3.00182 15.2248 3.61443 16.0544 4.43924 16.6489C5.26405 17.2435 6.25983 17.5732 7.28736 17.592C6.26644 18.3702 5.09731 18.9455 3.84688 19.2851C2.59643 19.6247 1.28921 19.7219 0 19.5712C2.25183 20.9724 4.87193 21.7157 7.54755 21.7123" fill="#1DA1F2"/>
  </svg>
  const facebook = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_1573_7465)">
  <path d="M24 12C24 5.37258 18.6275 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9894 4.38821 22.954 10.125 23.8542V15.4687H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6575 4.6875C15.97 4.6875 17.3438 4.92187 17.3438 4.92187V7.875H15.8306C14.34 7.875 13.875 8.80005 13.875 9.75V12H17.2031L16.6711 15.4687H13.875V23.8542C19.6118 22.954 24 17.9894 24 12Z" fill="#1877F2"/>
  <path d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.80102 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9706 4.6875 14.6575 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.3674 24.0486 12.6326 24.0486 13.875 23.8542V15.4688H16.6711Z" fill="white"/>
  </g>
  <defs>
  <clipPath id="clip0_1573_7465">
  <rect width="24" height="24" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  const arrowLeft = <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 1.5L2 7.5L8 13.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
  const arrowRight = <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 13.5L7 7.5L1 1.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
  const bubble = <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="4" cy="4" r="4" fill="#0D5590"/>
  </svg>
  const [isCopied, setCopied] = useClipboard('Your link will be ready soon', {
    successDuration: 1000,
  });
  

  return (
    <div className={cn("section", styles.section)}>
      <Title>Referral program<sup className={styles.comingsoon}> Coming soon</sup></Title>
      <Container>
          <span className={styles.boldParagraph}>Invite friend and get up to <span>50 FISHERS {hunter}</span></span>
          <p>For each friend that joing and meets the tasks</p>
          <div className={styles.referalLink}>
            <p className={styles.referalLinkParagraph}>My referral link</p>
            <div className={styles.innerContainerLink}>
              <span>Your link will be ready soon</span>
              <button className={styles.copyLinkButton} onClick={setCopied}>{isCopied ? "Copied" : <span>{copy} Copy link</span>}</button>
            </div>
          </div>
          <p className={styles.shareLink}>Share to: <span>{twitter}</span><span href="#">{facebook}</span></p>
      </Container>
      <Container>
        <div className={styles.ContainerRewards}>
          <div className={styles.ContainerLeft}>
            <div className={styles.ContainerFriends}>
              <div className={styles.ContainerNewFriends}><span>0</span><p>New friends joined from your invitation link!</p></div>
              <div className={styles.ContainerSuccessfulInvited}><span>0</span><p>Successful invited friends who completed all tasks</p></div>
            </div>
            <div className={styles.ContainerYourRewards}>
              <h4>Your reward</h4>
              <div className={styles.containerClaimHunters}>
                <span>0 FISHERS {hunter}</span>
                <button>Comming soon</button>
              </div>
            </div>
            <div className={styles.ContainerClaimHistory}>
              <h4>Reward history</h4>
              <ul>
                {/* <li><span>{hunter} 112 SALT</span><span>2022.03.15 12:24PM UTC</span></li> */}
                <li><span>{hunter} 0 FISHERS</span><span>...</span></li>
                <li><span>{hunter} 0 FISHERS</span><span>...</span></li>
                <li><span>{hunter} 0 FISHERS</span><span>...</span></li>
              </ul>
              <div className={styles.ClaimHistoryPagination}>{arrowLeft} <span className={styles.paginationText}><span className={styles.currentPage}>1</span> of <span>3</span></span> {arrowRight}</div>
            </div>
          </div>
          <div className={styles.ContainerRight}>
            <div className={styles.ContainerInstruction}>
              <p>You will get the reward after your friends:</p>
              <ul>
                <li>1. Create account on Fisher’s dashboard</li>
                <li>2. Download the game from steam & get at least 1 score</li>
              </ul>
            </div>
            <div className={styles.ContainerRewardsSystem}>
              <h4>Rewards system</h4>
              <ul>
                <li><span>Status</span><span>Invites</span><span>Rewards</span></li>
                <li><span>{bubble}</span><span>1-10 successful invite</span><span>{hunter} 5 FISHERS / invite</span></li>
                <li><span>{bubble}</span><span>11-20 successful invite</span><span>{hunter} 10 FISHERS / invite</span></li>
                <li><span>{bubble}</span><span>21-30 successful invite</span><span>{hunter} 15 FISHERS / invite</span></li>
                <li><span>{bubble}</span><span>31-40 successful invite</span><span>{hunter} 20 FISHERS / invite</span></li>
                <li><span>{bubble}</span><span> 41 &lt; successful invite</span><span>{hunter} 30 FISHERS / invite</span></li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReferralProgram;
