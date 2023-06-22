import React, { useState, useEffect } from 'react';
import styles from "./ResetPassword.module.sass";
import cn from "classnames";
import FadeIn from 'react-fade-in';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  const loadingMessage = loading.length > 0 ? loading : 'Reset';
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const successSvg =
    <svg width="20" viewBox="0 0 90 89" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="44.5" r="44.5" fill="#fff" />
      <path d="M21 44L25.5 48.5L37 60L69 28" stroke="#0D5590" strokeWidth="5" />
    </svg>
  const errorSvg = <svg width="16" viewBox="0 0 90 89" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="44.5" r="44.5" fill="#a72020" />
    <path d="M47.0576 24.6094L46.7148 52.1631H42.3115L41.9424 24.6094H47.0576ZM41.7842 60.5479C41.7842 59.7568 42.0215 59.0889 42.4961 58.5439C42.9883 57.999 43.709 57.7266 44.6582 57.7266C45.5898 57.7266 46.3018 57.999 46.7939 58.5439C47.3037 59.0889 47.5586 59.7568 47.5586 60.5479C47.5586 61.3037 47.3037 61.9541 46.7939 62.499C46.3018 63.0439 45.5898 63.3164 44.6582 63.3164C43.709 63.3164 42.9883 63.0439 42.4961 62.499C42.0215 61.9541 41.7842 61.3037 41.7842 60.5479Z" fill="white" />
  </svg>

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    localStorage.setItem('email', email);
    setLoading('Loading...');
    const registration = {
      email: email,
    };

    axios.post(`rest-auth/password/reset/`, registration, getApiConfig(false)
    ).then((response) => {
      setLoading('');
      const data = response.data;
      const success = []
      if (data) {
        for (const [key, value] of Object.entries(data)) {
          if (value === 'Password reset e-mail has been sent.') {
            success.push(value)
          }
        }
        setSuccessMessages(success)
      }
    }).catch((error) => {
      setLoading('');
      const data = error.response.data;
      const errors = []
      if (data) {
        for (const [key, value] of Object.entries(data)) {
          errors.push(value)
        }
      }
      setErrorMessages(errors)
    });
  }

  return (
    <div className={cn("container", styles.container)}>
      <h3 className={cn(styles.title)}>Reset password</h3>
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
          {errorMessages.map((x, index) => (
            <p key={index} className={cn(styles.errorMessage)}>{errorSvg}{x}</p>
          ))}
          {successMessages.map((x, index) => (
            <p key={index} className={cn(styles.successMessage)}>{successSvg}{x}</p>
          ))}
          <input type='submit' value={loadingMessage} className={cn("button", styles.button)} />
        </FadeIn>
      </form>
    </div>
  );
};

export default ResetPassword;