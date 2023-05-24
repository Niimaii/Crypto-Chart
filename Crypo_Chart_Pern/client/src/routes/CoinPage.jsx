import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { getChart } from '../api/cryptoAPI';
import BigChart from '../components/BigChart';
import { useParams } from 'react-router-dom';

function CoinPage() {
  const { portfolio, market } = useContext(CryptoContext);
  const { data, isLoading } = useQuery({
    queryKey: ['coin'],
    queryFn: () => getChart('bitcoin', 30),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
  });

  const { coin } = useParams();

  if (portfolio.isLoading || isLoading || market.isLoading) {
    return <h1>Loading...</h1>;
  }

  const chartData = data.data.chart;

  return (
    <div>
      <BigChart chartData={chartData} coin={coin} />
    </div>
  );
}

export default CoinPage;
