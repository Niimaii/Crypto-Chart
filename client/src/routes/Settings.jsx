import { useContext, useEffect, useState } from 'react';
import currencyCodes from '../data/Currency';
import { CryptoContext } from '../context/CryptoContext';
import { patchCurrency } from '../api/cryptoAPI';
import {
  changeEmail,
  changePassword,
  confirmPassword,
  deleteUser,
  fetchProtectedInfo,
  onLogout,
} from '../api/authAPI';
import { useNavigate } from 'react-router-dom';
import {
  EmailIcon,
  PasswordIcon,
  RightToggleArrow,
  TrashIcon,
} from '../icons/icons';

function Settings() {
  const navigate = useNavigate();

  const { currency, unAuthenticateUser } = useContext(CryptoContext);
  const [passwordCard, setPasswordCard] = useState(false);
  const [emailCard, setEmailCard] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [passwordCheckInput, setPasswordCheckInput] = useState('');
  const [loading, setLoading] = useState(true);

  // ↓↓↓↓↓↓↓↓ Authentication Check ↓↓↓↓↓↓↓↓
  let protectedData = null;

  const logout = async () => {
    try {
      // Clear cookies
      await onLogout();

      unAuthenticateUser();
      localStorage.removeItem('localAuth');
      window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  // Check to see if the user has a valid JWT token & not faking
  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      protectedData = data.info;
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);
  // ↑↑↑↑↑↑↑↑↑↑ Authentication Check ↑↑↑↑↑↑↑↑↑↑

  if (currency.isLoading || loading) {
    return <h1>Loading....</h1>;
  }

  const currencyData = currency.data.data.currency;

  const buttonPressed = (e) => {
    // Display the correct card based on input
    const setButton = eval(`set${e.target.id}Card`);
    setButton(true);
  };

  const updateCurrency = async (e) => {
    await patchCurrency({
      currency: e.target.value,
    });

    currency.refetch();
  };

  const updateEmail = async () => {
    console.log(emailInput);
    const emailInfo = {
      passwordCheck: passwordCheckInput,
      email: emailInput,
    };
    await changeEmail(emailInfo);
    setEmailCard(false);
    setEmailInput('');
    setPasswordCheckInput('');
  };

  const deleteAccount = async () => {
    await deleteUser(passwordCheckInput);
    setPasswordCheckInput('');
    setDeleteCard(false);
    // Remove user from page
    unAuthenticateUser();
    localStorage.removeItem('localAuth');
    window.location.reload(false);
  };

  const updatePassword = async () => {
    console.log(emailInput);
    const passwordInfo = {
      passwordCheck: passwordCheckInput,
      password: passwordInput,
      confirmPassword: passwordConfirmInput,
    };
    await changePassword(passwordInfo);
    setPasswordCard(false);
    setPasswordInput('');
    setPasswordCheckInput('');
    setPasswordConfirmInput('');
  };

  const handleKeyPressEmail = (e) => {
    if (e.key === 'Enter') {
      updateEmail();
    }
  };
  const handleKeyPressPassword = (e) => {
    if (e.key === 'Enter') {
      updatePassword();
    }
  };
  const handleKeyPressDelete = (e) => {
    if (e.key === 'Enter') {
      deleteAccount();
    }
  };

  return (
    <main className='settings'>
      <select value={currencyData} onChange={updateCurrency} id=''>
        {currencyCodes.map((currency) => {
          return (
            <option key={currency} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
      <article className='settings_card'>
        <h1>User Options</h1>
        <div className='settings_options'>
          <button id='Password' onClick={buttonPressed}>
            <div className='settings_icons'>
              <div>
                <PasswordIcon />
              </div>
              <h3>Password</h3>
            </div>
            <RightToggleArrow />
          </button>
          <hr />

          <button id='Email' onClick={buttonPressed}>
            <div className='settings_icons'>
              <div>
                <EmailIcon />
              </div>
              <h3>Email</h3>
            </div>
            <RightToggleArrow />
          </button>
          <hr />
          <button id='Delete' onClick={buttonPressed}>
            <div className='settings_icons'>
              <div>
                <TrashIcon />
              </div>
              <h3>Delete</h3>
            </div>
            <RightToggleArrow />
          </button>
        </div>
      </article>

      <button className='settings_logout' onClick={logout}>
        Log Off
      </button>

      {/* Display the Email card */}
      {emailCard && (
        <div className='pass_check'>
          <div className='pass_check_card'>
            <h1>Change Email</h1>
            <input
              value={passwordCheckInput}
              onChange={(e) => setPasswordCheckInput(e.target.value)}
              className='border'
              type='password'
            />
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className='border'
              type='text'
              onKeyDown={handleKeyPressEmail}
            />
            <button onClick={updateEmail}>Send</button>
          </div>
        </div>
      )}

      {/* Display the Password card */}

      {passwordCard && (
        <div className='pass_check'>
          <div className='pass_check_card'>
            <h1>Change Password</h1>
            <input
              value={passwordCheckInput}
              onChange={(e) => setPasswordCheckInput(e.target.value)}
              className='border'
              type='password'
            />
            <input
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className='border'
              type='password'
            />
            <input
              value={passwordConfirmInput}
              onChange={(e) => setPasswordConfirmInput(e.target.value)}
              className='border'
              type='password'
              onKeyDown={handleKeyPressPassword}
            />
            <button onClick={updatePassword}>Send</button>
          </div>
        </div>
      )}

      {deleteCard && (
        <div className='pass_check'>
          <div className='pass_check_card'>
            <h1>Delete Account</h1>
            <input
              value={passwordCheckInput}
              onChange={(e) => setPasswordCheckInput(e.target.value)}
              className='border'
              type='password'
              onKeyDown={handleKeyPressDelete}
            />
            <button onClick={deleteAccount}>Send</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Settings;
