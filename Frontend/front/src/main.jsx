import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import Loader from './Loader.jsx'
import ContextProvider from './ContextProv/AppProvider.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}> 
   <ContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ContextProvider>
  </QueryClientProvider>

)
