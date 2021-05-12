import React from 'react';
import './App.css'
import { useAuth } from "./context/auth-context";
import { Login } from "./Login";
import { PageBox } from "./PageBox";
const App = () => {
  const { user } = useAuth()

  return (
    <div className="App">
      {user ? <PageBox /> : <Login />}
    </div>
  );
};

export default App;