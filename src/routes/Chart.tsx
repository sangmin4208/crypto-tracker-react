import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";


interface ChartProps {
  coinId: string
}

interface IHistorical {
  time_open: string
  time_close: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  market_cap: number
}


function Chart() {
  const { coinId } = useOutletContext<ChartProps>()
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 10 * 1000 });
  const isDark = useRecoilValue(isDarkAtom)
  return <div>
    {isLoading ? <div>Loading chart...</div> : <ApexChart type="candlestick"
      series={[{
        data: data!.map(({ time_close, open, high, low, close }) => ({ x: time_close, y: [open, high, low, close] }))
      }]}

      options={{
        theme: {
          mode: isDark ? "dark" : "light"
        },
        chart: {
          height: 500,
          width: 500,
          toolbar: {
            show: false
          },
          background: "transparents",
        },
        yaxis: {
          show: false
        },
        xaxis: {
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: {
            show: false
          },
          type: "datetime",
          categories: data!.map(({ time_close }) => time_close)
        },
        grid: {
          show: false
        },
        stroke: {
          curve: "smooth",
        },
        tooltip: {
          y: {
            formatter: (value) => `$ ${value.toFixed(2)}`
          }
        }
      }}
    />}


  </div>
}

export default Chart;