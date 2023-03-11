import { useState, useContext } from 'react';
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
import Settings from './routes/Settings';
import Portfolio from './routes/Portfolio';
import UserHome from './routes/UserHome';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Navbar from './components/Navbar';
import PrivateRoutes from './components/PrivateRoutes';
import RestrictedRoutes from './components/RestrictedRoutes';

function App() {
  return (
    <CryptoContextProvider>
      <div className='container'>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/userhome' element={<UserHome />} />
              <Route path='/portfolio' element={<Portfolio />} />
              <Route path='/settings' element={<Settings />} />
            </Route>
            <Route path='/about' element={<About />} />
            <Route element={<RestrictedRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </CryptoContextProvider>
  );
}

export default App;
