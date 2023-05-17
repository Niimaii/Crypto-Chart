import React, { useContext, useEffect, useState } from 'react';
import { getPortfolio } from '../api/cryptoAPI';
import { CryptoContext } from '../context/CryptoContext';
import { fetchProtectedInfo, onLogout } from '../api/authAPI';
import { useQuery } from '@tanstack/react-query';
import TotalBalanceCard from '../components/TotalBalanceCard';
import YourPortfolioCard from '../components/YourPortfolioCard';
import ActivityCard from '../components/ActivityCard';

function Portfolio() {
  const { isAuth, unAuthenticateUser } = useContext(CryptoContext);
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const { isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 30,
  });

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

      setProtectedData(data.info);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  if (isLoading || loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <TotalBalanceCard />
      <YourPortfolioCard />
      <ActivityCard />
    </div>
  );
}

export default Portfolio;
