import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProviders } from "./context";
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
ReactDOM.render(
  <AppProviders>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </AppProviders>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
