import React, { useState, useEffect } from 'react';
import styles from "./Login.module.sass";
import ResetPassword from "../ResetPassword";
import cn from "classnames";
import FadeIn from 'react-fade-in';
import ReactLoading from 'react-loading';
import { getApiConfig } from '../../../functions/api';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = ({ setShowResults, setShowReset }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState('');
  const [notVerified, setNotVerified] = useState(false);
  const successSvg =
    <svg width="20" viewBox="0 0 90 89" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="44.5" r="44.5" fill="#fff" />
      <path d="M21 44L25.5 48.5L37 60L69 28" stroke="#0D5590" strokeWidth="5" />
    </svg>
  const errorSvg = <svg width="16" viewBox="0 0 90 89" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="44.5" r="44.5" fill="#a72020" />
    <path d="M47.0576 24.6094L46.7148 52.1631H42.3115L41.9424 24.6094H47.0576ZM41.7842 60.5479C41.7842 59.7568 42.0215 59.0889 42.4961 58.5439C42.9883 57.999 43.709 57.7266 44.6582 57.7266C45.5898 57.7266 46.3018 57.999 46.7939 58.5439C47.3037 59.0889 47.5586 59.7568 47.5586 60.5479C47.5586 61.3037 47.3037 61.9541 46.7939 62.499C46.3018 63.0439 45.5898 63.3164 44.6582 63.3164C43.709 63.3164 42.9883 63.0439 42.4961 62.499C42.0215 61.9541 41.7842 61.3037 41.7842 60.5479Z" fill="white" />
  </svg>
  const loginText = loadingLogin ? <span className={styles.loginText}>Logging in<ReactLoading className={styles.loaderIcon} /></span> : "Login";

  const resendVerification = async () => {
    setLoading('Sending email...')
    const registration = {
      email: email,
    };

    axios.post(`rest-auth/registration/resend-email/`, registration, getApiConfig()
    ).then((response) => {
      setLoading('')
    }).catch((error) => {
      console.log('got error resending email', error)
    })
  }

  const onSubmit = async e => {
    e.preventDefault();
    setLoadingLogin(true);

    const user = {
      email: email,
      password: password
    };

    axios.post(`rest-auth/login/`, user, getApiConfig(false)
    ).then((response) => {
      const data = response.data;
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('avatar', data.user.avatar);
      localStorage.setItem('items', data.user.items);
      localStorage.setItem('principal', data.user.principal);
      localStorage.setItem('guild', data.user.guild ?? 'None');
      setSuccessMessages('Logged in successfuly.')
      setErrorMessages([]);
      setLoadingLogin(false);
      history.push(`/`);
    }).catch((error) => {
      const errors = []
      const data = error.response.data;
      for (const [key, value] of Object.entries(data)) {
        console.error(`${value}`);
        setLoadingLogin(false);
        const checkIfTrue = JSON.stringify(value)
        if (checkIfTrue === '["E-mail is not verified."]') {
          errors.push(value)
          setNotVerified(true)
        } else {
          errors.push(value)
          setNotVerified(false)
        }
      }
      setErrorMessages(errors)

      console.error(error);
    })
  };

  return (
    <>
      <div className={cn("container", styles.container)}>
        <h3 className={cn(styles.title)}>Login to your account</h3>
        <form onSubmit={onSubmit}>
          <FadeIn>
            <div className={cn(styles.inputWrap)}>
              <label className={cn(styles.label)}>Email address</label>
              <input
                className={cn("input", styles.input)}
                name='email'
                type='email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={cn(styles.inputWrap)}>
              <label className={cn(styles.label)}>Password</label>
              <input
                className={cn("input", styles.input)}
                name='password'
                type='password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {errorMessages.map((x, index) => (
              <p key={index} className={cn(styles.errorMessage)}>
                {errorSvg}{x}
                {notVerified ? <span onClick={e => resendVerification()} className={cn(styles.resend)}>Resend email verification?</span> : null}
                {loading}
              </p>
            ))}
            {successMessages ?
              <p className={cn(styles.successMessage)}>{successSvg}{successMessages}</p>
              : null}
            <div onClick={() => setShowReset(true)} className={cn(styles.password)}>Forgot password?</div>
            <button type='submit' className={cn("button", styles.button)}>{loginText}</button>
          </FadeIn>
        </form>
        <p className={cn(styles.fancy)}><span>Or</span></p>
        <div onClick={() => setShowResults(true)} className={cn("button", styles.register)}>Create new account</div>
      </div>
    </>
  );
};

export default Login;