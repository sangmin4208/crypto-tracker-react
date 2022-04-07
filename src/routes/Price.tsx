import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchCoinPriceInfo } from "../api";

interface IPriceProps {
  coinId: string
}
interface TickerData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const slide = keyframes`
  0% {
    opacity:0;
    transform: translateY(100%);
  }
  100% {
    opacity:1;
    transform: translateY(0);
  }
`

const PriceInfo = styled.div`
  color: ${(props) => props.theme.textColor};
  background-color: rgba(0, 0, 0, 0.5);
  padding:20px;
  border-radius: 10px;
  margin-bottom: 10px;
  display:flex;
  flex-direction: column;
  align-items: center;
  animation: ${slide} 1s ease-in-out;
`
const PriceInfoLabel = styled.span`
  color: ${(props) => props.theme.textColor};
  font-size:10px;
  margin-bottom: 5px;
`

function Price() {
  const { coinId } = useOutletContext<IPriceProps>()
  const { isLoading, data } = useQuery<TickerData>(["ticker", coinId], () => fetchCoinPriceInfo(coinId), { refetchInterval: 10 * 1000 });
  if (isLoading) return <div>Loading...</div>
  return <>
    <PriceInfo>
      <PriceInfoLabel>
        최고가:
      </PriceInfoLabel>
      {`$${data?.quotes.USD.ath_price}`}
    </PriceInfo>
    <PriceInfo>
      <PriceInfoLabel>
        지난 24시간 거래량:
      </PriceInfoLabel>
      {`${data?.quotes.USD.volume_24h}`}
    </PriceInfo>
    <PriceInfo>
      <PriceInfoLabel>
        전일 대비:
      </PriceInfoLabel>
      {`${data?.quotes.USD.percent_change_24h}`}
    </PriceInfo>
  </>
}

export default Price;