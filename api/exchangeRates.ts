import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export type ExchangeRates = Record<
  string,
  {
    code: string;
    rate: number;
    country: string;
    currency: string;
    amount: number;
  }
>;

export type ExchangeRatesResponse = {
  date: string;
  exchangeRateNum: number;
  rates: ExchangeRates;
};

const CNB_DAILY_EXCHANGE_RATES_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

async function handler(_: VercelRequest, res: VercelResponse) {
  const { data, status } = await axios.get<string>(
    CNB_DAILY_EXCHANGE_RATES_URL
  );

  if (status !== 200) {
    return res
      .status(500)
      .send({ msg: "Failed to get current exchange rates" });
  }

  const [dateHeader, , ...rawExchangeRateLines] = data.split("\n");

  const [date, exchangeRateNumber] = dateHeader.split(" #");

  const parsedExchangeRates = rawExchangeRateLines
    .map((rawLine) => rawLine.split("|"))
    .reduce<ExchangeRates>((acc, [country, currency, amount, code, rate]) => {
      acc[code] = {
        code,
        rate: Number(rate),
        country,
        currency,
        amount: Number(amount),
      };

      return acc;
    }, {});

  const responseBody: ExchangeRatesResponse = {
    date,
    exchangeRateNum: Number(exchangeRateNumber),
    rates: parsedExchangeRates,
  };
  return res.send(responseBody);
}

export default handler;
