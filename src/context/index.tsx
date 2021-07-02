import { ReactNode } from "react";
import { AuthProvider } from './auth-context'
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <Router>
          {children}
        </Router>
      </AuthProvider>
    </QueryClientProvider>

  )
}
