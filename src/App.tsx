import "./App.css";
import { Input } from "./components/Input/Input";

function App() {
  return (
    <div className="container mx-auto pb-4 pt-4 sm:pt-12 px-4">
      <h1 className="sm:text-3xl text-xl font-bold text-center sm:text-left">
        💰 Currency converter
      </h1>
      <div className="flex py-4">
        <Input type={"number"} min={0} placeholder="Enter value" />
      </div>
    </div>
  );
}

export default App;
