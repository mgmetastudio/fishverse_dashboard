import cn from "classnames";
import styles from "./Main.module.sass";
import { NavLink } from "react-router-dom";
import SignOut from "./SignOut"
import {menuIcons} from './menuIcons'
import {items} from "./menuList"


const arrowStyle = {
  "position": "absolute",
  "right": "12px",
  "marginTop": "3px"
}

const arrowUp = <svg style={arrowStyle} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12L10 7L5 12" stroke="white" strokeWidth="2" sstrokelinecap="round"/></svg>
const arrowDown = <svg style={arrowStyle} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8L10 13L15 8" stroke="white" strokeWidth="2" sstrokelinecap="round"/></svg>

const Main = (props) => {
  return (
    <div className={styles.section}>
      <div className={styles.row}>
          <div className={styles.list}>
              {items.map((x, index) => (
                 <div className={styles.menuContainer} key={index}>
                  { x.submenu ? 
                  <div className={props.menuOpened.includes(x.title) ? styles.linkOpened : styles.link} key={index} onClick={() => props.handleMenuOpenClose(x.title, false)} >
                    {x.logo}{x.title} {x.submenu && props.menuOpened.includes(x.title) ? arrowUp : arrowDown}
                  </div> :
                  <NavLink className={cn("link", styles.link)} activeClassName={cn(styles.linkActive)} key={index} to={x.link} >
                    {x.logo}{x.title} {x.submenu && props.menuOpened.includes(x.title) ? arrowUp : x.submenu && !props.menuOpened.includes(x.title) ? arrowDown : null}
                  </NavLink>
                  }
                  <div className={ props.menuOpened.includes(x.title) ? styles.menuSubmenuOpened : styles.menuSubmenuClosed}>
                  {x.submenu ?
                    x.submenu.map((y, index) => (
                      y.link === 'buy-tokens-nft'
                    ? <NavLink 
                        className={cn("link", styles.link)}
                        to='#' 
                        key={index}
                        >{y.title}<sup className={styles.comingsoon}> Coming soon</sup></NavLink>
                      :
                      <NavLink 
                      className={cn("link", styles.link)}
                      activeClassName={cn(styles.linkActive)}
                      onClick={() => props.handleMenuOpenClose(x.title, true)}
                      key={index} 
                      to={y.link}
                      >
                        {y.title}
                      </NavLink>
                    ))
                  : null} 
                  </div>
                </div>
              ))}
              <SignOut />
          </div>
      </div>
    </div>
  );
};

export default Main;
