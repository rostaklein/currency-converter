import React from "react";
import { useCurrentCZKExchangeRates } from "./useCurrentCZKExchangeRates";

type Props = {};

export const ListExchangeRates: React.FC<Props> = () => {
  const { data } = useCurrentCZKExchangeRates();

  return (
    <table className="table-auto w-full my-4 text-sm">
      <thead>
        <tr>
          <th className="text-left">Currency (Country)</th>
          <th className="text-left">Code</th>
          <th className="text-right">Amount</th>
          <th className="text-right">Rate</th>
        </tr>
      </thead>
      <tbody>
        {data
          ? Object.values(data.rates).map((rate) => (
              <tr>
                <td className="capitalize">
                  {rate.currency}{" "}
                  <span className="text-black/30">({rate.country})</span>
                </td>
                <td width={100}>{rate.code}</td>
                <td className="text-right" width={100}>
                  {rate.amount}
                </td>
                <td className="text-right" width={100}>
                  {rate.rate}
                </td>
              </tr>
            ))
          : Array.from({ length: 12 }).map((_, i) => (
              <tr className="animate-pulse">
                <td className="py-1">
                  <div className="h-2.5 bg-black/10 rounded-full w-48"></div>
                </td>
                <td className="py-1" width={100}>
                  <div className="h-2.5 bg-black/10 rounded-full w-8"></div>
                </td>
                <td className="py-1 text-right" width={100}>
                  <div className="h-2.5 bg-black/20 rounded-full w-4 inline-block"></div>
                </td>
                <td className="py-1 text-right" width={100}>
                  <div className="h-2.5 bg-black/10 rounded-full w-12 inline-block"></div>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};
