import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import App from './App'; 
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = 'pk_test_aGVscGVkLXRlcnJpZXItMzEuY2xlcmsuYWNjb3VudHMuZGV2JA'
// import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render( 
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App /> 
    </ClerkProvider>
  </React.StrictMode> 
); 
