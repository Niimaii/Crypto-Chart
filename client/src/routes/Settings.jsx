import { useContext, useState } from 'react';
import currencyCodes from '../data/Currency';
import { CryptoContext } from '../context/CryptoContext';
import { patchCurrency } from '../api/cryptoAPI';
import { confirmPassword } from '../api/authAPI';

function Settings() {
  const { currency } = useContext(CryptoContext);
  const [checkPass, setCheckPass] = useState(false);
  const [checkInput, setCheckInput] = useState('');

  if (currency.isLoading) {
    return <h1>Loading....</h1>;
  }

  const currencyData = currency.data.data.currency;

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
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      passwordValidation();
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
        <button onClick={() => setCheckPass(true)}>Password</button>
        <button onClick={() => setCheckPass(true)}>Email</button>
        <button onClick={() => setCheckPass(true)}>Delete</button>
      </div>
      {/* Display the password check if button is pressed  */}
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
    </div>
  );
}

export default Settings;
