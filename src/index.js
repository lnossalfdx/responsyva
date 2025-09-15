import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* O Roteador fica aqui, no topo de tudo */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)