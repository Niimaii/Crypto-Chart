import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';

function useMarket(param) {
  const [volume, setVolume] = useState({});

  const [days, setDays] = useState(1);

  const [coinResponse, setCoinResponse] = useState();

  const [chartResponse, setChartResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const { response } = useAxios(
    `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
  );

  useEffect(() => {
    const getData = async () => {
      let count = 0;
      try {
        setCoinResponse(response);
        setLoading(true);

        if (response) {
          console.log('Response', response);
          response.map(async (coin) => {
            const result = await axios(
              `coins/${coin.id}/market_chart?vs_currency=usd&days=${days}`
            );

            if (result) {
              count++;
              //   console.log('result', result.data);
              setChartResponse((previous) => ({
                ...previous,
                [coin.id]: result,
              }));

              setVolume((previous) => ({
                ...previous,
                [coin.id]: result.data.total_volumes.at(-1)[1],
              }));

              console.log('TEST: ', response.length, count);
              console.log('Chart', count);
              if (response.length === count) {
                setLoading(false);
              }
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [response, days]);

  return { coinResponse, days, volume, chartResponse, loading };
}

export default useMarket;
