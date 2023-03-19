import React from 'react';

function CryptoTable({ response, volume }) {
  //   console.log(response);
  // Currency formatter

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const chartPercent = (num) => {
    if (num > 0) {
      return '+' + num;
    } else {
      return num;
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Change</th>
          <th>
            <span>1D</span>Volume
          </th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {response &&
          response.map((coin) => {
            return (
              <tr>
                <th>{coin.name}</th>
                <td>{formatter.format(coin.current_price)}</td>
                <td
                  className={`${
                    coin.price_change_percentage_24h > 0
                      ? 'percentGreen'
                      : 'percentRed'
                  }`}
                >
                  {chartPercent(coin.price_change_percentage_24h)}%
                </td>
                <td>{formatter.format(volume[coin.id])}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default CryptoTable;
