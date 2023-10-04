import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    //!! jika API sudah tidak berjalan
    //!! dapatkan API baru dari https://currencyfreaks.com
    //!! simpan key pada file .env isi sama seperti pada .env.example
    const key =
      import.meta.env.VITE_API_KEY || "0642f8c124994f88899db9514a24f4ab";
    const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${key}&symbols=CAD,EUR,IDR,JPY,CHF,GBP`;

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        const dataRates = res.data.rates;

        const currencyArray = Object.keys(dataRates).map((rate) => ({
          rate,
          weBuy: Number(dataRates[rate] * 1.05).toFixed(4),
          exchangeRate: Number(dataRates[rate]).toFixed(6),
          weSell: Number(dataRates[rate] * 0.95).toFixed(4),
        }));

        setCurrencyData(currencyArray);
      } catch (err) {
        console.error("Terjadi Kesalahan: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-orange-500 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-lg mb-5">
        <table className="w-full text-center text-white text-lg">
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {currencyData.map((currency, index) => (
              <tr key={index}>
                <td>{currency.rate}</td>
                <td>{currency.weBuy.toString()}</td>
                <td>{currency.exchangeRate.toString()}</td>
                <td>{currency.weSell.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center text-white text-lg mb-4">
        <p>Rates are based from 1 USD</p>
        <p>
          This application uses API from{" "}
          <a
            href="https://currencyfreaks.com"
            className="font-semibold hover:underline"
          >
            https://currencyfreaks.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
