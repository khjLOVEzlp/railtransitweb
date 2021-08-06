import './App.css'
import { useAuth } from "./context/auth-context";
import { Login } from "./Login";
import { PageBox } from "./PageBox";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { FullPageErrorFallback } from "./components/lib";
import { Navigate, Route, Routes } from 'react-router';

const App = () => {
  const { user } = useAuth()

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {
          user ? <PageBox /> : <Login />
        }
      </ErrorBoundary>
    </div>
  );
};

export default App;