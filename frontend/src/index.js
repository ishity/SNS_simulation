import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './state/AuthContext';

ReactDOM.render(
  // 脆弱性などをすぐに知らせてくれる
  <React.StrictMode> 
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
