import React, { useState } from 'react';
import CurrencyForm from './CurrencyForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Currency = ({ names, completeCurrency, removeCurrency, updateCurrency }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateCurrency(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <CurrencyForm edit={edit} onSubmit={submitUpdate} />;
  }

  return names.map((currency, index) => (
    <div
      className={currency.isComplete ? 'currency-row complete' : 'currency-row'}
      key={index}
    >
        <TiEdit
          onClick={() => setEdit({ id: currency.id, value: currency.text })}
          className='edit-icon'
        />
      <div key={currency.id} onClick={() => completeCurrency(currency.id)}>
        {currency.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeCurrency(currency.id)}
          className='delete-icon'
        />

      </div>
    </div>
  ));
};

export default Currency;
