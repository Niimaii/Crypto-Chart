import { useContext, useState } from 'react';
import currencyCodes from '../data/Currency';
import { CryptoContext } from '../context/CryptoContext';
import { patchCurrency } from '../api/cryptoAPI';
import { changeEmail, changePassword, confirmPassword } from '../api/authAPI';

function Settings() {
  const { currency } = useContext(CryptoContext);
  const [passwordCard, setPasswordCard] = useState(false);
  const [emailCard, setEmailCard] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);

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

  const passwordValidation = async () => {
    const result = await confirmPassword(checkInput);

    if (result.data.success) {
      setCheckPass(false);
      // Clear the input field
      setCheckInput('');
    }
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
