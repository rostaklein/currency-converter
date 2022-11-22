import "./App.css";
import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListExchangeRates } from "./sections/ListExchangeRates/ListExchangeRates";
import { useCurrentCZKExchangeRates } from "./sections/ListExchangeRates/useCurrentCZKExchangeRates";

const queryClient = new QueryClient();

const MainPage: React.FC = () => {
  const { data, error } = useCurrentCZKExchangeRates();
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
          <div className="my-4">
            <h3 className="text-lg font-bold text-black/40">
              {data ? (
                <>
                  Exchange rates{" "}
                  <span className="text-black/60">
                    #{data?.exchangeRateNum}
                  </span>{" "}
                  for <span className="text-black/60">{data?.date}</span>
                </>
              ) : (
                "Loading..."
              )}
            </h3>
          </div>
          <div className="flex my-4 space-x-4">
            <Input type={"number"} min={0} placeholder="Enter value" />
            <Button>Convert to USD</Button>
          </div>
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
