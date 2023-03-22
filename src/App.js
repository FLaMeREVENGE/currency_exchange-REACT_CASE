import React from 'react';
import './App.css';
import CurrencyList from './components/CurrencyList';

import Euro from "./currency/Euro";
import Dolar from "./currency/Dolar";

function App() {
  return (
    <>
    <div className='title'>
    <p>Currency Exchange</p>
    </div>

    <div className='currency'>
    <div className="exchange">

    <div className='check'>
    <p>Check the exchange rate!</p>
    </div>
    <Euro />
    <Dolar />
    </div>

    <div className='currencyList'>
      <CurrencyList />
    </div>
    </div>
    </>

  );
}

export default App;
