import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useAxios(param) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

  const fetchData = async (param) => {
    try {
      // Render loading skeleton before we get a response
      setLoading(true);

      const result = await axios(param);
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
    fetchData(param);
  }, []);

  return { response, loading, error };
}

export default useAxios;
