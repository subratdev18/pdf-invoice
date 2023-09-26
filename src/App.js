import React, { useState } from 'react';
import './App.css';
import InvoiceForm from './components/createInvoice/InvoiceForm';
import { PDFViewer } from '@react-pdf/renderer';
import InvoicePDF from './components/getPDF/InvoicePDF';

function App() {
  return (
    <div className="App">
      <InvoiceForm />
    </div>
  );
}

export default App;
