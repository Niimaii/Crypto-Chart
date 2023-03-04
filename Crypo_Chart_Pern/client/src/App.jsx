import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CryptoContext, CryptoContextProvider } from './context/CryptoContext';
import About from './routes/About';
import Home from './routes/Home';
import MyCharts from './routes/MyCharts';
import Trading from './routes/Trading';

function App() {
  return (
    <CryptoContextProvider>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/myCharts/:id' element={<MyCharts />} />
            <Route path='/trading/:id' element={<Trading />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CryptoContextProvider>
  );
}

export default App;
