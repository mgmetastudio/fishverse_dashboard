import cn from "classnames";
import styles from "./Connect.module.sass";
import { NavLink } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { useRecoilValue } from "recoil";
import { identityState } from "../../../atoms";


const Connect = (props) => {
  const principal = localStorage.getItem('principal');
  const identity = useRecoilValue(identityState);

  return (
    <>
      <NavLink
        className={cn("button-white", styles.buttonConnect)}
        to={principal ? '#' : '/'}
      >
        {principal ? <span className={cn(styles.walletKey)}>{isMobile ? `${principal.substr(0, 3)}...${principal.substr(-1, 1)}` : `${principal.substr(0, 8)}...${principal.substr(-6, 6)}`}</span> : !identity && principal ? <span>Connect</span> : <span>Log In</span>}
      </NavLink>
    </>
  );
};

export default Connect;