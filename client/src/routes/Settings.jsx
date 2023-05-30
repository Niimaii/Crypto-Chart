import { useContext } from 'react';
import currencyCodes from '../data/Currency';
import { CryptoContext } from '../context/CryptoContext';
import { patchCurrency } from '../api/cryptoAPI';

function Settings() {
  const { currency } = useContext(CryptoContext);

  if (currency.isLoading) {
    return <h1>Loading....</h1>;
  }

  const currencyData = currency.data.data.currency;

  console.log(currencyData);

  const updateCurrency = async (e) => {
    await patchCurrency({
      currency: e.target.value,
    });

    currency.refetch();
  };
  return (
    <div>
      <select value={currencyData} onChange={updateCurrency} id=''>
        {currencyCodes.map((currency) => {
          return (
            <option key={currency} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Settings;
