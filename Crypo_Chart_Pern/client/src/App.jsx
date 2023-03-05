import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { CryptoContext, CryptoContextProvider } from './context/CryptoContext';
import About from './routes/About';
import Home from './routes/Home';
import MyCharts from './routes/MyCharts';
import Portfolio from './routes/Portfolio';
import UserHome from './routes/UserHome';

function App() {
  let isAuth = false;

  const PrivateRoutes = () => {
    return <>{isAuth ? <Outlet /> : <Navigate to='/' />}</>;
  };

  return (
    <CryptoContextProvider>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:user' element={<UserHome />} />
            <Route path='/:user/myCharts' element={<MyCharts />} />
            <Route path='/:user/portfolio' element={<Portfolio />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CryptoContextProvider>
  );
}

export default App;
