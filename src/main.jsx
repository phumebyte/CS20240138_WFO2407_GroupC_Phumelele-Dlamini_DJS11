import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.jsx'
import { FavoritesProvider } from './context/FavouritesContext.jsx'

createRoot(document.getElementById('root')).render(
  <FavoritesProvider>
    <StrictMode>
    <App />
  </StrictMode>
  </FavoritesProvider>

  
  ,
)
