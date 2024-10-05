import React, {  useState } from 'react'; 
import './App.css'; 
import InvoiceForm from './components/createInvoice/InvoiceForm'; 
// import {  PDFViewer } from '@react-pdf/renderer'; 
// import InvoicePDF from './components/getPDF/InvoicePDF'; 
import Header from './components/header'; 
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App() { 
  return ( 
    <div className="App"> 
      <Header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header> 
      <InvoiceForm /> 
    </div> 
  ); 
} 
 
export default App; 
