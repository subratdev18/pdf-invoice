import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const InvoiceQRCode = ({ billFrom, totalAmount, client, items}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const formatInvoiceDetails = () => {
    const {name, address, invoiceId, invoiceDate, dueDate} = billFrom;
    const {clientName, clientAddress} = client;

    let formattedDetails = `Invoice Numbering: ${invoiceId}\nInvoice Date: ${invoiceDate}\nDue Date: ${dueDate}\nService Provider: ${name}\nProvider's Address: ${address}\nCustomer Name: ${clientName}\nCustomer Address: ${clientAddress}\nItems:\n`;
  
    items?.map(({itemDescription, quantity, price, amount}, index) => {
      formattedDetails += `${index + 1}. ${itemDescription} - Qty: ${quantity}, Price: ${price}, Amount: ${amount}\n`;
    });

    formattedDetails += `Total Amount: ${totalAmount()}`
  
    return formattedDetails;
  };
  

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const formattedDetails = formatInvoiceDetails();
        const url = await QRCode.toDataURL(formattedDetails);
        setQrCodeUrl(url);
      } catch (err) {
        console.error(err);
      }
    };

    generateQRCode();
  }, [billFrom, totalAmount, client, items]);

  return (
    <div>
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="Invoice QR Code" />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default InvoiceQRCode;
