import React, { useState } from "react";
import cn from "classnames";
import styles from "./Header.module.sass";
import { Link, NavLink } from "react-router-dom";
import Image from "../Image";
import Connect from "./Connect"
import FixedMobileMenu from "./FixedMobileMenu";
import Social from "./Social";
import ActionBar from "./ActionBar"

const Header = ({ separatorHeader, wide, path }) => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  var windowWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const textColor = {
    color: "#fff"
  }
  console.log("Path: ", path)
  return (
    <>
      <div
        className={cn(
          styles.header,
          { [styles.headerBorder]: separatorHeader },
          { [styles.wide]: wide }
        )}
      >
          <Link className={styles.logoMobile} to="/">
              <Image
                className={styles.pic}
                src="/images/logo-dark.svg"
                srcDark="/images/logo-light.svg"
                alt="Fishverse"
              />
          </Link>
        <div className={cn("container", styles.container)}>
          
          <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
            <FixedMobileMenu setVisibleNav={setVisibleNav} />
            <div className={styles.mobileTop}>
                <a
                  style={path == "/" ? textColor : null}
                  className={styles.link}
                  href="https://thefishverse.com/"
                >
                  Home
                </a>
                <NavLink
                  style={path == "/" ? textColor : null}
                  className={cn(styles.link)}
                  to="/overview"
                >
                  Dashboard
                </NavLink>
                
            </div>
            <Link className={styles.logo} to="/">
              <Image
                className={styles.pic}
                src="/images/logo-dark.svg"
                srcDark="/images/logo-light.svg"
                alt="FishVesre"
              />
            </Link>
            { windowWidth > 767 ? <ActionBar /> : null}
            {path == "/" ? null : 
              <div className={styles.mobileBottom}>
                <Connect setCurrentAccount={setCurrentAccount} />
              </div>
            }
          </div>
          { windowWidth < 767 ? <ActionBar /> : null}
          <button
            className={cn(styles.burger, { [styles.active]: visibleNav })}
            onClick={() => setVisibleNav(!visibleNav)}
          ></button>
        </div>
      </div>
      <Social />
    </>
  );
};

export default Header;
