import { useState } from "react";
import Login from "./Login";
import cn from "classnames";
import styles from "./Authentification.module.sass";
import {isMobile} from 'react-device-detect';
import Register from "./Register";
import ResetPassword from "./ResetPassword";

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
      { (showResults && !showReset) ? <Register setShowResults={setShowResults} /> 
        : (!showResults && !showReset) ? <Login setShowResults={setShowResults} setShowReset={setShowReset} /> 
        : (!showResults && showReset) ? <ResetPassword/>
        : null
        }
    </div>
  );
};

export default Authentification;