import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListExchangeRates } from "./sections/ListExchangeRates/ListExchangeRates";
import { useCurrentCZKExchangeRates } from "./sections/ListExchangeRates/useCurrentCZKExchangeRates";
import { CurrentExchangeTitle } from "./sections/CurrentExchangeTitle/CurrentExchangeTitle";
import { CurrencyConverter } from "./sections/CurrencyConverter/CurrencyConverter";

const queryClient = new QueryClient();

const MainPage: React.FC = () => {
  const { error } = useCurrentCZKExchangeRates();
  return (
    <div className="container mx-auto pb-4 pt-4 sm:pt-12 px-4">
      <h1 className="sm:text-3xl text-xl font-bold text-center sm:text-left">
        💰 Currency converter
      </h1>
      {error ? (
        <h3 className="text-lg font-bold text-red-400">
          Failed to get current CZK exchange rates.
        </h3>
      ) : (
        <>
          <CurrentExchangeTitle />
          <CurrencyConverter />
          <div className="my-4">
            <ListExchangeRates />
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
