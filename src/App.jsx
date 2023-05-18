import { AppWrapper } from "./components/Index";
import { Login } from "./pages/Login";

function App() {
  const token = localStorage.getItem("token");

  return <>{token ? <AppWrapper /> : <Login />}</>;th
}

export default App;
