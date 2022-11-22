import React from "react";
import { CgSpinner } from "react-icons/cg";
import { useCurrentCZKExchangeRates } from "../ListExchangeRates/useCurrentCZKExchangeRates";

type Props = {};

export const CurrentExchangeTitle: React.FC<Props> = () => {
  const { data, isRefetching } = useCurrentCZKExchangeRates();

  return (
    <div className="my-4 flex space-x-2 items-center">
      <h3 className="text-lg font-bold text-black/40">
        {data ? (
          <>
            Exchange rates{" "}
            <span className="text-black/60">#{data?.exchangeRateNum}</span> for{" "}
            <span className="text-black/60">{data?.date}</span>
          </>
        ) : (
          "Loading..."
        )}
      </h3>
      {isRefetching && <CgSpinner className="animate-spin text-black/50" />}
    </div>
  );
};
