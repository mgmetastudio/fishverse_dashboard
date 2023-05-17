import { useState } from "react";
import Login from "./Login";
import cn from "classnames";
import styles from "./Authentification.module.sass";
import {isMobile} from 'react-device-detect';

const dBgImg = {
  backgroundImage: 'url(/images/auth-bg-desktop.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}
const mBgImg = {
  backgroundImage: 'url(/images/auth-bg-mobile.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const Authentification = () => {
  const [showResults, setShowResults] = useState(false);
  const [showReset, setShowReset] = useState(false);
  return (
    <div style={ isMobile ? mBgImg : dBgImg } className={cn("container", styles.container)}>
      <Login setShowResults={setShowResults} setShowReset={setShowReset} /> 
    </div>
  );
};

export default Authentification;