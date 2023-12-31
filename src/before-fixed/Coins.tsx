import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// 전체 Container < Header < CoinsList < Coin

const Loader = styled.span`
  font-size: 20px;
  display: block;
  text-align: center;
  margin-top: 30px;
`;

const Container = styled.div`
  height: 100vh;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  background-color: white;
  border-radius: 15px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  a {
    transition: color 0.3s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

interface CoinObject {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinObject[]>([]);
  const [loading, setLoading] = useState(true);
  const getCoins = async () => {
    const json = await (
      await fetch(`https://api.coinpaprika.com/v1/coins`)
    ).json();
    // console.log(json); 6만개이상
    setCoins(json.slice(0, 100));
    console.log(coins); //100개
    setLoading(false);
  };
  useEffect(() => {
    getCoins();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((item) => (
            <Coin key={item.id}>
              <Link to={`/${item.id}`} state={item.name}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`}
                />
                {item.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
