import React from 'react';
import './App.css'
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { AuthenticatedApp } from "./authenticated-app";
const App = () => {
  const { user } = useAuth()

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
};

export default App;