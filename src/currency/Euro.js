import React from "react";

const formatCurrency = (value, currency) =>
  parseFloat(value).toLocaleString(undefined, {
    style: "currency",
    currency
  });

export default () => {
  const [error, setError] = React.useState(null);
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState();
  const [currency, setCurrency] = React.useState("EUR");
  const [currencies, setCurrencies] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.nbp.pl/api/exchangerates/tables/B?format=json";
      const response = await fetch(url);
      const json = await response.json();
      setCurrencies(json[0].rates);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (value && currencies && currency) {
      const selectedCurrency = currencies.filter(c => c.code === currency)[0];
      if (!selectedCurrency || !selectedCurrency.mid) {
        setError("Cannot connect to NBP...");
        return;
      }

      const calculated = parseFloat(value) / selectedCurrency.mid;

      if (calculated > 0) {
        setError(null);
        setResult(parseFloat(value) / selectedCurrency.mid);
      } else {
        setError("Wrong value...");
      }
    } else if (!value) {
      setError("Please specify value");
    } else {
      setError("Something went wrong...");
    }
  }, [value, currencies, currency]);

  return (
    <div id="calculator">
            <div className="price">EURO</div>
    <div>
        <select value={currency}
        className="inputBox"
        onChange={e => setCurrency(e.target.value)}>
          {currencies.map(c => (
            <option key={c.code} value={c.code}>
              {c.code} - {c.currency}
            </option>
          ))}
        </select>
      </div>
      <div>

        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          className="inputBox"
          placeholder='Enter the price in EURO'
          name='text'
        />
      </div>

      <output className="output">
      {error && <p>{error}</p>}
      {result && !error && (
        <p style={{ fontSize: "1.5em" }}>
          {formatCurrency(value, "EUR")} = {formatCurrency(result, currency)}
        </p>
      )}
      </output>
    </div>
  );
};
