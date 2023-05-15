import { AppWrapper } from "./components/Index";
import { Login } from "./pages/Login";

function App() {
  const token = localStorage.getItem("token");
  console.log(token);

  return <>{token ? <AppWrapper /> : <Login />}</>;
}

export default App;
