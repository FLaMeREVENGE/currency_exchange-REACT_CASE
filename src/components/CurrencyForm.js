import React, { useState, useEffect, useRef } from 'react';
import { FaHeart } from "react-icons/fa";

import { TiEdit } from 'react-icons/ti';


function CurrencyForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
    setCurrency(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  
  const [currency, setCurrency] = React.useState("EUR");
  const [currencies, setCurrencies] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.nbp.pl/api/exchangerates/tables/A?format=json";
      const response = await fetch(url);
      const json = await response.json();
      setCurrencies(json[0].rates);
    };

    fetchData();
  }, []);

  
  return (
    <>
    <form onSubmit={handleSubmit} className='currency-form'>
      {props.edit ? (
        <>
        <select
        value={currency}
        ref={inputRef}
        onChange={handleChange}
        className='currency-input edit'>

          {currencies.map(c => (
            <option key={c.code} value={c.code}>
              {c.code} - {c.currency}
            </option>
          ))}
          
        </select>
          <button onClick={handleSubmit} className='currency-button edit'>
          <TiEdit 
            className="edit-icon"
          />
          </button>
        </>
      ) : (
        <>
        <select
        value={currency}
        ref={inputRef}
        onChange={handleChange}
        className='currency-input'>

          {currencies.map(c => (
            <option key={c.code} value={c.code}>
              {c.code} - {c.currency}
            </option>
          ))}
          
        </select>

          <button onClick={handleSubmit} className='currency-button'>
          <FaHeart 
            className="icon-love"
          />
          </button>
        </>
      )}
    </form>
    </>
    
  );
}

export default CurrencyForm;
