import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExchangeRatesResponse } from "../../../api/exchangeRates";

export const useCurrentCZKExchangeRates = () => {
  return useQuery({
    queryKey: ["currentCZKExchangeRates"],
    queryFn: async () => {
      const { data } = await axios<ExchangeRatesResponse>("/api/exchangeRates");
      return data;
    },
  });
};
