import currencyCodes from '../data/Currency';

function Settings() {
  console.log(currencyCodes);
  return (
    <div>
      <select value={'USD'} id=''>
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
