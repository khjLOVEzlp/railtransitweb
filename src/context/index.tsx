import { ReactNode } from "react";
import { AuthProvider } from './auth-context'
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
})

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          {children}
        </AuthProvider>
      </Router>
    </QueryClientProvider>

  )
}
