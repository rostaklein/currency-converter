import "./App.css";
import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListExchangeRates } from "./sections/ListExchangeRates/ListExchangeRates";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto pb-4 pt-4 sm:pt-12 px-4">
        <h1 className="sm:text-3xl text-xl font-bold text-center sm:text-left">
          💰 Currency converter
        </h1>
        <div className="my-4">
          <ListExchangeRates />
        </div>
        <div className="flex py-4 space-x-4">
          <Input type={"number"} min={0} placeholder="Enter value" />
          <Button>Convert to USD</Button>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
