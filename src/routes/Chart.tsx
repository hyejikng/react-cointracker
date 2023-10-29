import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from '../api';
import { useOutletContext } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
interface ChartProps {
  coinId: string;
}

// data값 알려주기
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  // console.log(coinId);
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ['ohlcv', 'coinId'],
    queryFn: () => fetchCoinHistory(coinId),
  });
  return (
    <div>
      {isLoading ? (
        'Loading Chart.'
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close) as number[],
            },
          ]} // as를 써서 이 배열은 number라는 인식을 강제로 심어주자.
          options={{
            theme: { mode: 'dark' },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            stroke: { curve: 'smooth', width: 4 },
            grid: { show: false },
            xaxis: { labels: { show: false }, axisTicks: { show: false } },
            yaxis: { labels: { show: false } },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
