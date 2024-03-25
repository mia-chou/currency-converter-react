import { useState } from 'react';
import './currency.css';

function CurrencyConverter() {

const [amount, setAmount]=useState(1);
const [fromcurrency, setFromCurrency]=useState('USD');
const [exchangeRate, setExchangeRate]=useState();
const [convertedAmount, setConvertedAmount]=useState()

  
function handleAmountChange(event){

    
}



return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
<div className="input-container">

    <input 
    value={amount}
    onChange={handleAmountChange}
    type="number" 
    name="amount" 
    placeholer="Enter Amount"/>






</div>
    </div>
  );
}

export default CurrencyConverter;
