import './App.css'
import { useAuth } from "./context/auth-context";
import { Login } from "./Login";
import { PageBox } from "./PageBox";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { FullPageErrorFallback } from "./components/lib";
import { Route, Routes, useNavigate, Navigate } from 'react-router';
import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [])

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <Routes>
          {
            user ? <Route path={'/*'} element={<PageBox />} /> : <Route path={'/login'} element={<Login />} />
          }
          <Navigate to={user ? "/" : "/login"} />
        </Routes>
        {/* {
          user ? <PageBox /> : <Login />
        } */}
      </ErrorBoundary>
    </div>
  );
};

export default App;