import React, { useState } from 'react';
import CurrencyForm from './CurrencyForm';
import Currency from './Currency';

import { confirmAlert } from 'react-confirm-alert'; // 
import "react-confirm-alert/src/react-confirm-alert.css";

import { FaTrashAlt } from "react-icons/fa";


function CurrencyList() {
  const [names, setNames] = useState([]);

  const addCurrency = currency => {
    if (!currency.text || /^\s*$/.test(currency.text)) {
      return;
    }

    const newNames = [currency, ...names];

    setNames(newNames);
    console.log(...names);
  };

  const updateCurrency = (currency, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setNames(prev => prev.map(item => (item.id === currency ? newValue : item)));
  };

  const removeCurrency = id => {
    const removedArr = [...names].filter(currency => currency.id !== id);

    setNames(removedArr);
  };

  const completeCurrency = id => {
    let updatedNames = names.map(currency => {
      if (currency.id === id) {
        currency.isComplete = !currency.isComplete;
      }
      return currency;
    });
    setNames(updatedNames);
  };
  
  const submit = () => {
    confirmAlert({
      title: "Remove all currencies",
      message: "Are you sure you want to remove all currencies?",
      buttons: [
        {
          label: "Yes",
          onClick: () => window.location.reload()
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        }
      ]
    });
  };

  return (
    <>
      <h1>What is your favorite currency?</h1>
      <CurrencyForm onSubmit={addCurrency} />
      <Currency
        names={names}
        completeCurrency={completeCurrency}
        removeCurrency={removeCurrency}
        updateCurrency={updateCurrency}
      />

<button
className='remove-all'
onClick={submit}>

<FaTrashAlt className='remove-icon'/>
{/* <p>Remove all currencies</p> */}
</button>
     
    </>
  );
}

export default CurrencyList;