import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { getChart } from '../api/cryptoAPI';

function CoinPage() {
  const { portfolio, market } = useContext(CryptoContext);
  const { data, isLoading } = useQuery({
    queryKey: ['market'],
    queryFn: () => getChart('bitcoin', 30),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
  });

  if (portfolio.isLoading || isLoading || market.isLoading) {
    return <h1>Loading...</h1>;
  }

  const chartData = data.data.chart;

  return <div>hey</div>;
}

export default CoinPage;
