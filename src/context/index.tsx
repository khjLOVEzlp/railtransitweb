import { ReactNode } from "react";
import { AuthProvider } from './auth-context'
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
const queryConfig = {
  /**
   * refetchOnWindowFocus 窗口获得焦点时重新获取数据
   * staleTime 过多久重新获取服务端数据
   * cacheTime 数据缓存时间 默认是 5 * 60 * 1000 5分钟
   */
  queries: {
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
    retry: 0
  },
};

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
