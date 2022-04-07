import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "../api";

const Container = styled.div`
  padding:0px 20px;
`;

const Header = styled.header`
  height:10vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color:${props => props.theme.bgColor};
  border-radius:15px;
  margin-bottom:20px;
  a {
    display:flex;
    align-items: center;
    padding:20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a{ 
      color:${(props) => props.theme.accentColor}
    }
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
`

const Loader = styled.span`
  text-align: center;
  display:block;
`

const Img = styled.img`
  position:relative;
  top:-2px;
  width:35px;
  height:35px;
  margin-right: 10px;
`


interface ICoin {
  id: number;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data: coins } = useQuery<ICoin[]>("allCoins", fetchCoins)
  return (
    <Container>
      <Helmet>
        <title>
          코인
        </title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? <Loader>loading...</Loader> : <CoinsList>
        {
          coins?.slice(0, 100).map(coin => <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={{ name: coin.name }}>
              <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt={`${coin.name} Logo`} />
              <span>{coin.name} &rarr;</span>
            </Link>
          </Coin>)
        }

      </CoinsList>}
    </Container >
  );
}

export default Coins