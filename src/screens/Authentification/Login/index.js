import { useState } from 'react';
import styles from "./Login.module.sass";
import cn from "classnames";
import FadeIn from 'react-fade-in';
import ReactLoading from 'react-loading';
import { useRecoilState } from 'recoil';
import { identityState } from '../../../atoms';
import { agentState } from '../../../atoms';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from "@dfinity/agent";
import { useHistory } from 'react-router-dom';
import { successSvg } from '../../../constants/svg';
import { getHttpAgent } from '../../../functions/network';


const Login = ({ setShowResults, setShowReset }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState('');
  const [notVerified, setNotVerified] = useState(false);
  const [identity, setIdentity] = useRecoilState(identityState);
  const [agent, setAgent] = useRecoilState(agentState);

  const loginText = loadingLogin ? <span className={styles.loginText}>Logging in<ReactLoading className={styles.loaderIcon} /></span> : "Login";

  let iiUrl;
  if (process.env.DFX_NETWORK === "local") {
    iiUrl = `http://localhost:4943/?canisterId=${process.env.II_CANISTER_ID}`;
  } else if (process.env.DFX_NETWORK === "ic") {
    iiUrl = `https://identity.internetcomputer.org/`;
  } else {
    iiUrl = `https://${process.env.II_CANISTER_ID}.dfinity.network`;
  }

  const onSubmit = async e => {
    e.preventDefault();
    setLoadingLogin(true);

    const authClient = await AuthClient.create();

    await new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: iiUrl,
        onSuccess: resolve,
        onError: reject,
      });
    });
    
    const authIdentity = authClient.getIdentity();
    const agent = await getHttpAgent({ identity: authIdentity});

    setIdentity(authIdentity)
    setAgent(agent)

    setLoadingLogin(false);
    setSuccessMessages('Loged in successfuly.')
    setErrorMessages([]);

    localStorage.setItem('isWalletConnected', true);   
    localStorage.setItem('principal', authIdentity.getPrincipal().toText());   
    history.push(`/`);
  };

  return (
    <>
    <div className={cn("container", styles.container)}>
      <h3 className={cn(styles.title)}>Login to your account</h3>
        <form onSubmit={onSubmit}>
        <FadeIn>
          {errorMessages.map((x, index) => (
              <p key={index} className={cn(styles.errorMessage)}>
                { errorSvg }{x}
                {notVerified ? <span onClick={e => resendVerification()} className={cn(styles.resend)}>Resend email verification?</span> : null}
                {loading}
              </p>
            ))}
          {successMessages ? <p className={cn(styles.successMessage)}>{ successSvg }{successMessages}</p>: null}
          <button type='submit' className={cn("button", styles.button)}>{loginText}</button>
          </FadeIn>
        </form>
    </div>
    </>
  );
};

export default Login;