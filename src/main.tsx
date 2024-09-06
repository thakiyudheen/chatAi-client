import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { SocketProvider } from './context/socketProvider.tsx';
import { Toaster, toast } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-center" richColors  />
    <SocketProvider>
      <Router>
        <App />
      </Router>
    </SocketProvider>
  </React.StrictMode>,
)
