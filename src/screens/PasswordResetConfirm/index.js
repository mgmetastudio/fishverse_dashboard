import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import cn from "classnames";
import styles from "./PasswordResetConfirm.module.sass";
import axios from "axios";
import { getApiConfig } from "../../functions/api";

const bgImg = {
  backgroundImage: 'url(/images/404-bg.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const [button, setButton] = useState('Change');
  const [showLogin, setShowLogin] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const successSvg = 
    <svg width="20" viewBox="0 0 90 89" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="45" cy="44.5" r="44.5" fill="#323232"/>
      <path d="M21 44L25.5 48.5L37 60L69 28" stroke="#fff" strokeWidth="5"/>
    </svg>
  const errorSvg = <svg width="16" viewBox="0 0 90 89" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="45" cy="44.5" r="44.5" fill="#a72020"/>
  <path d="M47.0576 24.6094L46.7148 52.1631H42.3115L41.9424 24.6094H47.0576ZM41.7842 60.5479C41.7842 59.7568 42.0215 59.0889 42.4961 58.5439C42.9883 57.999 43.709 57.7266 44.6582 57.7266C45.5898 57.7266 46.3018 57.999 46.7939 58.5439C47.3037 59.0889 47.5586 59.7568 47.5586 60.5479C47.5586 61.3037 47.3037 61.9541 46.7939 62.499C46.3018 63.0439 45.5898 63.3164 44.6582 63.3164C43.709 63.3164 42.9883 63.0439 42.4961 62.499C42.0215 61.9541 41.7842 61.3037 41.7842 60.5479Z" fill="white"/>
  </svg>

  const onSubmit = async e => {
    e.preventDefault();
    setButton('Loading...')

    const resetData = { 
      new_password1: password1,
      new_password2: password2,
      uid: uid,
      token: token,
     }

    axios.post(`rest-auth/password/reset/confirm/`, resetData, getApiConfig(false)
    ).then((response) => {
      setButton('Log in')
      const data = response.data;
      const success = []
      for (const [key, value] of Object.entries(data)) {
        success.push(value)
        setShowLogin(true);
      }
      setErrorMessages([])
      setSuccessMessages(success)      
    }).catch((error) => {
      setButton('Change')
      const data = error.response.data;
      const errors = []
      if (data) {
        for (const [key, value] of Object.entries(data)) {
          errors.push(value)
        }
        setErrorMessages(errors)
      }
    });
  }

  return (
    <>
    <div style={bgImg} className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <h3 className={cn(styles.title)}>Password reset</h3>
          <form onSubmit={onSubmit}>
            <div className={cn(styles.inputWrap)}>
              <label className={cn(styles.label)}>Password</label>
              <input
              className={cn("input", styles.input)}
              name='password1'
              type='password'
              value={password1}
              required
              onChange={e => setPassword1(e.target.value)}
            />
            </div>
            <div className={cn(styles.inputWrap)}>
              <label className={cn(styles.label)}>Confirm password</label>
              <input
                className={cn("input", styles.input)}
                name='password2'
                type='password'
                value={password2}
                required
                onChange={e => setPassword2(e.target.value)}
              />
            </div>
            {errorMessages.map((x, index) => (
              <p key={index} className={cn(styles.errorMessage)}>{ errorSvg }{x}</p>
            ))}
            {successMessages.map((x, index) => (
              <p key={index} className={cn(styles.successMessage)}>{ successSvg }{x}</p>
            ))}
            {showLogin ? <NavLink className={cn("button", styles.button)} to="/">Login</NavLink>: <input type='submit' value={button} className={cn("button", styles.button)} />}
          </form>
      </div>
      </div>
    </>
  );
};

export default PasswordResetConfirm;