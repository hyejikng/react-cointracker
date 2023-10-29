import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from '../api';
import { useOutletContext } from 'react-router-dom';
interface ChartProps {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  // console.log(coinId);
  const { isLoading, data } = useQuery({
    queryKey: ['ohlcv', 'coinId'],
    queryFn: () => fetchCoinHistory(coinId),
  });
  return <h1>Chart</h1>;
}

export default Chart;
