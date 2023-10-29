//api.tsx

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

// coinId에 대한 정보가 이 파일에는 없기때문에 argument로 받아와 type을 지정해준다.
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  //   const endDate = Math.floor(Date.now() / 1000);
  //   const StartingTime = endDate - 60 * 60 * 24 * 7; // a week ago
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) => response.json());
}

// ${BASE_URL}/coins/${coinId}/ohlcv/latest
