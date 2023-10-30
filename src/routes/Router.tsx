import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coin from './Coin';
import Coins from './Coins';
import Chart from './Chart';
import Price from './Price';

interface IRouterProps {
  toggleClick: () => void; //아무것도 리턴하지 않았으므로 .
  isDark: boolean;
}

function Router({ toggleClick, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins toggleClick={toggleClick} />}></Route>
        <Route path="/:coinId" element={<Coin isDark={isDark} />}>
          <Route path="chart" element={<Chart />}></Route>
          <Route path="price" element={<Price />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
