import { useEffect, useState } from 'react';
import { getChart } from '../api/cryptoAPI';

function useDB(coin, days) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      // Render loading skeleton before we get a response
      setLoading(true);

      const result = await getChart(coin, days);
      //   Set response = to result of our request
      setResponse(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      // Remove loading skeleton when everything is valid
      setLoading(false);
    }
  };

  //   Initiate our request
  useEffect(() => {
    fetchData(coin, days);
  }, []);

  return { response, loading, error };
}

export default useDB;
