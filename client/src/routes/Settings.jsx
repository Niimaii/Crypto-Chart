import { useContext, useState } from 'react';
import currencyCodes from '../data/Currency';
import { CryptoContext } from '../context/CryptoContext';
import { patchCurrency } from '../api/cryptoAPI';
import { changeEmail, changePassword, confirmPassword } from '../api/authAPI';

function Settings() {
  const { currency } = useContext(CryptoContext);
  const [checkPass, setCheckPass] = useState(false);
  const [passwordCard, setPasswordCard] = useState(false);
  const [emailCard, setEmailCard] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);

  const [buttonChose, setButtonChose] = useState('');

  const [checkInput, setCheckInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
  const [passwordCheckInput, setPasswordCheckInput] = useState('');

  if (currency.isLoading) {
    return <h1>Loading....</h1>;
  }

  const currencyData = currency.data.data.currency;

  const buttonPressed = (e) => {
    setCheckPass(true);
    setButtonChose(e.target.id);
  };

  const updateCurrency = async (e) => {
    await patchCurrency({
      currency: e.target.value,
    });

    currency.refetch();
  };

  const passwordValidation = async () => {
    const result = await confirmPassword(checkInput);
    // This is equal to a useState based on the id of the button pressed
    const setButton = eval(`set${buttonChose}Card`);

    if (result.data.success) {
      setCheckPass(false);
      // Clear the input field
      setCheckInput('');
      setButton(true);
    }
  };

  const updateEmail = async () => {
    console.log(emailInput);
    await changeEmail(emailInput);
    setEmailCard(false);
    setEmailInput('');
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      passwordValidation();
    }
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

  return (
    <div className=''>
      <div className='flex gap-5'>
        <select value={currencyData} onChange={updateCurrency} id=''>
          {currencyCodes.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
        <button id='Password' onClick={buttonPressed}>
          Password
        </button>
        <button id='Email' onClick={buttonPressed}>
          Email
        </button>
        <button id='Delete' onClick={buttonPressed}>
          Delete
        </button>
      </div>
      {/* Display the password check if a button is pressed  */}
      {checkPass && (
        <div className='pass_check'>
          <div className='pass_check_card'>
            <h1>Password Check</h1>
            <input
              value={checkInput}
              onChange={(e) => setCheckInput(e.target.value)}
              className='border'
              type='password'
              onKeyDown={handleKeyPress}
            />
            <button onClick={passwordValidation}>Send</button>
          </div>
        </div>
      )}

      {emailCard && (
        <div className='pass_check'>
          <div className='pass_check_card'>
            <h1>Change Email</h1>
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
    </div>
  );
}

export default Settings;
