import { useState } from "react";
import cn from "classnames";
import styles from "./FixedMobileMenu.module.sass";
import { NavLink } from "react-router-dom";
import SignOut from "../../Menu/SignOut";

const items = [
  {
    title: "Overview",
    link: "overview",
  },
  {
    title: "Staking",
    link: "staking",
  },
  {
    title: "Your stakes",
    link: "your-stakes",
  },
  {
    title: "Wallet",
    link: "wallet",
  },
  {
    title: "NFT Marketplace",
    link: "marketplace",
  },
  {
    title: "Download game",
    link: "download-game",
  },
  {
    title: "LeaderBoard",
    link: "leaderboard",
  },
  {
    title: "Purchase tokens",
    link: "purchase-tokens",
  },
  {
    title: "Profile",
    link: "profile",
  },
];
const svgOpen = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="24" y="24" width="24" height="24" rx="12" transform="rotate(180 24 24)" fill="white"/>
<path d="M18 9L12 15L6 9" stroke="black" strokeWidth="2"/>
</svg>

const svgClose = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="12" fill="white"/>
<path d="M6 15L12 9L18 15" stroke="black" strokeWidth="2"/>
</svg>




const FixedMobileMenu = ({ setVisibleNav }) => {
  const [visibleMobile, setVisibleMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className={cn(styles.list, { [styles.active]: visibleMobile })}>
      {items.map((x, index) => (
              x.title === 'Purchase tokens'
            ? <NavLink 
                onClick={() => setVisible(true)} 
                className={cn("link", styles.link)}
                activeClassName={cn(styles.linkActive)}
                to='#' 
                key={index}
                >{x.title}</NavLink>
            : <NavLink 
                onClick={() => setVisibleNav(false)} 
                className={cn("link", styles.link)}
                activeClassName={cn(styles.linkActive)}
                key={index} 
                to={x.link}
              >{x.title}</NavLink>
            ))}
        <SignOut />
      </div>
    </>
  );
};

export default FixedMobileMenu;
