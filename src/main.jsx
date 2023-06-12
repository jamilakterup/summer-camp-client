import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import {RouterProvider} from "react-router-dom";
import router from './Routes/Routes';
import AuthProviders from './components/Providers/AuthProviders';
import {Toaster} from 'react-hot-toast';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <Toaster position="top-center" reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProviders>
  </React.StrictMode>,
)
