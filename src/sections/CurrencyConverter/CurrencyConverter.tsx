import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { HiSwitchHorizontal } from "react-icons/hi";
import { FaEquals } from "react-icons/fa";
import { Select } from "../../components/Select/Select";
import { useCurrentCZKExchangeRates } from "../ListExchangeRates/useCurrentCZKExchangeRates";
import { formatCurrency } from "../../utils/formatCurrency";

type ConvertedResult = {
  originalAmount: number;
  convertedCurrency: {
    code: string;
    amount: number;
  };
};

export const CurrencyConverter: React.FC = () => {
  const { data } = useCurrentCZKExchangeRates();
  const [valueInCZK, setValueInCZK] = useState<string>("");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("");
  const [convertedResult, setConvertedResult] =
    useState<ConvertedResult | null>(null);

  useEffect(() => {
    if (data) {
      const firstCurrencyCode = Object.keys(data.rates)[0];
      setSelectedCurrencyCode(firstCurrencyCode);
    }
  }, [data]);

  const parsedValueInCZK = Number(valueInCZK);

  const isFormValid = parsedValueInCZK > 0 && selectedCurrencyCode;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!isFormValid || !data) {
      return;
    }

    const targetCurrency = data.rates[selectedCurrencyCode];

    const convertedAmount =
      (parsedValueInCZK / targetCurrency.rate) * targetCurrency.amount;

    setConvertedResult({
      originalAmount: parsedValueInCZK,
      convertedCurrency: {
        code: targetCurrency.code,
        amount: convertedAmount,
      },
    });
  };

  return (
    <div>
      <form
        className="flex my-4 sm:space-x-4 items-center sm:flex-row flex-col sm:space-y-0 space-y-2"
        onSubmit={handleSubmit}
      >
        <div className="flex space-x-4 items-center flex-1 w-full">
          <Input
            type="number"
            min={0}
            step="0.01"
            placeholder="Enter value in CZK"
            className="h-10"
            value={valueInCZK}
            onChange={(e) => setValueInCZK(e.target.value)}
          />
          <div className="font-bold">CZK</div>
        </div>
        <div className="text-black/50">to</div>
        <Select
          className="h-10 flex-1 basis-10"
          onChange={(e) => setSelectedCurrencyCode(e.target.value)}
        >
          {data &&
            Object.values(data.rates).map((rate) => (
              <option
                key={rate.code}
                value={rate.code}
                selected={selectedCurrencyCode === rate.code}
              >
                {rate.code} ({rate.currency})
              </option>
            ))}
        </Select>
        <Button className="h-10" disabled={!isFormValid} type="submit">
          <HiSwitchHorizontal className="inline-block" /> Convert
        </Button>
      </form>
      {convertedResult && (
        <div className="flex sm:space-x-4 rounded px-8 py-4 items-center justify-center sm:flex-row flex-col sm:space-y-0 space-y-2 text-xl font-bold">
          <div className="flex space-x-4 bg-black/5 rounded px-4 sm:px-8 py-4">
            {formatCurrency(convertedResult.originalAmount, "CZK")}
          </div>
          <div className="text-center flex flex-col justify-center items-center">
            <span className="text-xs text-black/30">equals cca</span>
            <HiSwitchHorizontal className="text-black/50" />
          </div>
          <div className="flex space-x-4 bg-black/5 rounded px-4 sm:px-8 py-4">
            {formatCurrency(
              convertedResult.convertedCurrency.amount,
              convertedResult.convertedCurrency.code
            )}
          </div>
        </div>
      )}
    </div>
  );
};
