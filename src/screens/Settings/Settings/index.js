import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Settings.module.sass";
import Switch from "../../../components/Switch";
import Confirm from "../../../components/Confirm";
import ReactLoading from 'react-loading';
import Title from "../../../components/Title";
import { telegram, twitter } from "../../../constants/svg";

const Profile = () => {
  const randomNumber = Math.floor(Math.random() * 10000);
  let avatarText = localStorage.getItem('username') ?? ` #${randomNumber}`;
  const aboutTemp = localStorage.getItem('about') ?? "None";
  const [username, setUsername] = useState('Loading...');
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState('Loading...');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [saved, setSaved] = useState(0);
  const [discordLink, setDiscrodLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [aboutMe, setAboutMe] = useState(aboutTemp);
  const [socialErrorMessages, setSocialErrorMessages] = useState(false);


  function updateUsername(e) {
    setUsername(e.target.value);
    setIsEditing(true);
  }
  function updateSocial(e, social) {
    if (social === 0) {
      setDiscrodLink(e.target.value);
    } else if (social === 1) {
      setTwitterLink(e.target.value);
    } else if (social === 2) {
      setTelegramLink(e.target.value);
    }
    setIsEditing(true);
  }

  function updateLocation(e, location) {
    console.log('Coming soon location select');
  }

  function passwordSet1(e) {
    setNewPassword1(e.target.value);
    setIsEditing(true);
  }
  function passwordSet2(e) {
    setNewPassword2(e.target.value);
    setIsEditing(true);
  }

  function newsletterChange(e) {
    setNewsletter(e.target.checked);
    setIsEditing(true);
  }

  return (
    <div className={cn(styles.section)}>
      <div className={cn(styles.container)}>
        <div className={styles.avatarDescrition}>
          <Title>Profile settings</Title>
        </div>
        <div className={styles.gameSettingsContainer}>
          <span className={styles.profileTitle}>Game settings</span>
          <div className={styles.containerInnerBottom}>
            <div className={styles.nicknameAndAvatar}>
              <div className={styles.changeAvatar}>
                <div className={styles.avatarInnerSmaller}>
                  {avatar != null
                    ? <picture>
                      <label className={styles.update} htmlFor="avatar"><img src={avatar} alt={avatarText.substring(0, 2)} /><input type="file" name="avatar" /></label>
                    </picture>
                    : <span className={styles.avatarLetters}>{avatarText.substring(0, 2)}</span>
                  }
                </div>
              </div>
              <div className={styles.nicknameWrapper}>
                <div className={styles.label}>
                  Nickname
                </div>
                <input onChange={updateUsername} type="text" name="Username" value={username} />
              </div>
            </div>
          </div>
          <div className={styles.containerInnerBottom}>
            <div className={styles.label}>
              My guild
            </div>
            <div className={styles.guild}>
              None
            </div>
          </div>
          <div className={styles.containerInnerBottom}>
            <div className={styles.label}>
              Email address
            </div>
            <div className={styles.walletInput}>{email}</div>
          </div>
          <div className={styles.saveCancel}>
            <button className={styles.save}>{isLoading === 1 ? <ReactLoading className={styles.buttonLoader} /> : "Save"}</button>
          </div>
          <div className={saved === 1 ? styles.settingsSaving : styles.settingsSaved}>Changes saved succcessfuly</div>
        </div>
        <div className={styles.additionalInformationContainer}>
          <span className={styles.profileTitle}>Additional information</span>
          <div className={styles.containerInnerBottom}>
            <div className={styles.label}>About me</div>
            <div className={styles.textareaInput}>
              <textarea onChange={(e) => setAboutMe(e.target.value)} name="about me" rows="4" maxlength="120" cols="50">{aboutMe}</textarea>
              <span>{aboutMe === undefined || aboutMe === null ? 120 : 120 - aboutMe.length} characters left</span>
            </div>
          </div>
          <div className={styles.containerInnerBottom}>
            <div className={styles.label}>
              Social accounts
            </div>
            <div className={twitterLink && twitterLink.length > 0 ? styles.socialAccounts : styles.socialAccountsEmpty}>
              {twitter}<input onChange={(e) => updateSocial(e, 1)} type="text" name="Twitter link" placeholder="Twitter link" value={twitterLink} />
            </div>
            <div className={telegramLink && telegramLink.length > 0 ? styles.socialAccounts : styles.socialAccountsEmpty}>
              {telegram}<input onChange={(e) => updateSocial(e, 2)} type="text" name="Telegram link" placeholder="Telegram link" value={telegramLink} />
            </div>
          </div>
          <div className={styles.containerInnerBottom}>
            <div className={styles.label}>
              Country & City
            </div>
            <div className={country && country.length > 0 ? styles.location : styles.location}>
              <input onChange={(e) => updateLocation(e, 1)} type="text" name="Country" placeholder="Country" value={country} />
            </div>
            <div className={city && city.length > 0 ? styles.location : styles.location}>
              <input onChange={(e) => updateLocation(e, 2)} type="text" name="City" placeholder="City" value={city} />
            </div>
          </div>
          <div className={styles.saveCancel}>
            <button className={styles.save}>{isLoading === 2 ? <ReactLoading className={styles.buttonLoader} /> : "Save"}</button>
          </div>
          {socialErrorMessages ? <div className={saved === 2 ? styles.settingsSavingError : styles.settingsSaved}>Please check if you have filled social link correctly</div> :
            <div className={saved === 2 ? styles.settingsSaving : styles.settingsSaved}>Changes saved succcessfuly</div>}
          <div>
          </div>

        </div>
        <div className={styles.passwordChangeContainer}>
          <span className={styles.profileTitle}>Password</span>
          <div className={styles.passwordWrapper}>
            <div className={styles.label}>
              New password
            </div>
            <input onChange={passwordSet1} type="password" name="New password" placeholder="New password" />
          </div>
          <div className={styles.passwordWrapper}>
            <div className={styles.label}>
              Re-enter new password
            </div>
            <input onChange={passwordSet2} type="password" name="Repeat new password" placeholder="Repeat new password" />
          </div>
          {errorMessages.map((x, index) => (
            <p key={index} className={cn(styles.errorMessage)}>{x}</p>
          ))}
          {successMessages.map((x, index) => (
            <p key={index} className={cn(styles.successMessage)}>{x}</p>
          ))}
          <div className={styles.saveCancel}>
            <button className={styles.save}>Save</button>
          </div>
        </div>
        <div className={styles.passwordChangeContainer}>
          <span className={styles.profileTitle}>Security & Marketing</span>
          <div className={styles.toggleContainer}>
            <div className={styles.toggle}>
              <Switch />
              <div className={styles.toggleDescription}>
                <h6>Third-party authenticator app<sup className={styles.comingsoon}> Coming soon</sup></h6>
                <p>Use an Authenticator App as your Two-Factor Authentication (2FA). When you sign in you’ll be required to use the security code provided by your Authenticator App.</p>
              </div>
            </div>
            <div className={styles.toggle}>
              <Switch
                checked={newsletter}
                value={newsletter}
                onChange={(e) => newsletterChange(e)}
              />
              <div className={styles.toggleDescription}>
                <h6>Email newsletter</h6>
              </div>
            </div>
          </div>
          <div className={styles.saveCancel}>
            <button className={styles.save}>{isLoading === 4 ? <ReactLoading className={styles.buttonLoader} /> : "Save"}</button>
          </div>
          <div className={saved === 4 ? styles.settingsSaving : styles.settingsSaved}>Changes saved succcessfuly</div>
        </div>
        <div className={styles.containerInnerBottomLast}>
          <div className={styles.closeAccount}>
            <button className={styles.closeAccount}>Close this account</button>
          </div>
        </div>
      </div>
      <Confirm className={styles.confirmPopup} visible={confirm}>
        <p className={styles.confirmP}>Confirm to change your avatar</p>
        <button className={styles.confirmButton}>Confirm</button>
      </Confirm>
    </div>
  );
};

export default Profile;