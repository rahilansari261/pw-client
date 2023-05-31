import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppWrapper } from "./components/Index";
import { Login } from "./pages/Login";

const App = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return <div>{loggedIn ? <AppWrapper /> : <Login />}</div>;
};

export default App;
