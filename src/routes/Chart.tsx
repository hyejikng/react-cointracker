//Chart.tsx

import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from '../api';
import { useOutletContext } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
interface ChartProps {
  coinId: string;
  isDark: boolean;
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
  const { coinId, isDark } = useOutletContext<ChartProps>();

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
            theme: { mode: isDark ? 'dark' : 'light' },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            stroke: { curve: 'smooth', width: 5 },
            grid: { show: false },
            xaxis: {
              type: 'datetime',
              labels: { show: false },
              axisTicks: { show: false },
              categories: data?.map(
                (price) => new Date(+price.time_close * 1000).toUTCString() // 단항 연산자 +
              ),
            },
            yaxis: { labels: { show: false } },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 1,
                opacityTo: 0.8,
                // stops: [20, 80, 90],
                gradientToColors: ['#e81123'],
              },
            },
            colors: ['#fff100'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`, //소숫점 아래 세번째까지 보이게한다.
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
