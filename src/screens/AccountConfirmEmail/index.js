import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import cn from "classnames";
import styles from "./AccountConfirmEmail.module.sass";
import axios from "axios";
import { getApiConfig } from "../../functions/api";

const bgImg = {
  backgroundImage: 'url(/images/404-bg.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const AccountConfirmEmail = () => {
  const { key } = useParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState('');
  const [button, setButton] = useState(false);
  const email = localStorage.getItem('email');

  useEffect(() => {
    axios.post(`/rest-auth/registration/verify-email/`, { key: key }, getApiConfig(false)
    ).then((response) => {
      setButton(true);
      setMessage('Verification complete. Now you can login to your account.');
    }).catch((error) => {
      setMessage('Verification failed. Please click resend button to get new verification email.');
      setButton(false);
    });
  }, []);

  const onResendClick = async e => {
    setLoading('Sending email...')
    setMessage('')

    axios.post(`/rest-auth/registration/resend-email/`, { email: email }, getApiConfig(false)
    ).then((response) => {
      setLoading(`Account verification has been send to email: ${email}`)
    }).catch((error) => {
      setLoading(`Email could not be send, try again later or contact support: ${email}`)
    });
  };

  return (
    <div style={bgImg} className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <h1>Account verification</h1>
        <p>{message}</p>
        <p>{loading}</p>
        {button ? <NavLink className={cn("button", styles.login)} to='/'>Log in</NavLink> : <button onClick={(e) => onResendClick(e)} className={cn("button", styles.login)}>Resend</button>}
      </div>
    </div>
  );
};

export default AccountConfirmEmail;