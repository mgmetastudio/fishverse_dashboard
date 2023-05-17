import { withRouter, useLocation } from "react-router-dom";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./Page.module.sass";
import Header from "../Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import Main from "../../components/Main";
import Menu from "../../components/Menu";
import FadeIn from 'react-fade-in';
import Warning from "../Warning";
import { isWalletMerged } from "../../functions/utils";
import { useRecoilState } from "recoil";
import { identityState } from "../../atoms";

const Page = ({
  separatorHeader,
  children,
  fooferHide,
  wide,
  withMainLayout
}) => {
  const { pathname, search }= useLocation();
  const [identity] = useRecoilState(identityState);

  const merged = isWalletMerged();
  const ref  = new URLSearchParams(search).get('ref')
  if (ref && ref.length === 8){
    localStorage.setItem("referral_code", ref)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);
  const [menuOpened, setMenuOpened] = useState([]);

  const handleMenuOpenClose = (title, isSubmenu) => {
    if(menuOpened.includes(title)) {
      if(isSubmenu) {
        setMenuOpened([title]);
      } else {
        setMenuOpened(prev => prev.filter(menu => menu !== title )) 
      }
    } else {
      setMenuOpened(current => [...current, title]);
    }
    console.log(menuOpened, isSubmenu);
  }

  if (withMainLayout){
    return (
        <>
          <div className={styles.page}>
            <Header
              path={pathname}
              separatorHeader={separatorHeader}
              wide={wide}
            />
            <div className={styles.inner}>
              <Main title={'Game download'}/>
                <div className={styles.MetaContainer}>
                  <Menu menuOpened={menuOpened} handleMenuOpenClose={handleMenuOpenClose} />
                  <div style={{width: "100%"}}>
                    <FadeIn>
                      {identity ? children : <Warning text={'using FishVerse dashboard.'} />}
                    </FadeIn>
                  </div>
                </div>
            </div>
            <Footer />
          </div>
        </>
    );
  } else {
    return (
        <>
          <div className={styles.page}>
            <Header
              path={pathname}
              separatorHeader={separatorHeader}
              wide={wide}
            />
            <div className={styles.inner}>
              {children}
            </div>
          </div>
        </>
      );
  }
};

export default withRouter(Page);
