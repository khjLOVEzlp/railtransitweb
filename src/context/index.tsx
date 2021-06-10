import { ReactNode } from "react";
import { AuthProvider } from './auth-context'
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          {children}
        </Router>
      </AuthProvider>
    </QueryClientProvider>

  )
}
