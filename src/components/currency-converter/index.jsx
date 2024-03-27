import { useEffect, useState } from "react";
import "./currency.css";

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(0); // Initialize with default value
  const [convertedAmount, setConvertedAmount] = useState();

  async function fetchExchangeRate() {
    try {
      const apiResponse = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`,
        {
          method: "GET",
        }
      );
      const result = await apiResponse.json();
      const calculatedRate = result?.rates[toCurrency];
      setExchangeRate(calculatedRate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  }

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleFromCurrencyChange(event) {
    setFromCurrency(event.target.value);
  }

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value);
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
          placeholder="Enter Amount"
        />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value={"USD"}>USD</option>
          <option value={"INR"}>INR</option>
          <option value={"EUR"}>EUR</option>
        </select>
      </div>
      <p>To</p>
      <div className="input-container">
        <input
          type="number"
          value={convertedAmount}
          readOnly
        />
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value={"EUR"}>EUR</option>
          <option value={"INR"}>INR</option>
          <option value={"USD"}>USD</option>
        </select>
      </div>
      <p className="exchange-rate">
        Exchange Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}
      </p>
    </div>
  );
}

export default CurrencyConverter;
