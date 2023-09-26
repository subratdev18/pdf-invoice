import React, { useState } from 'react';
import InvoicePDF from '../getPDF/InvoicePDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import './styles.css';

const InvoiceForm = () => {

// state for storing info about user creating Invoice
  const [billFrom, setBillFrom] = useState({
    name: '',
    address: '',
    invoiceNumber: '',
  })

// state for capturing info of person who needs to pay
  const [client, setClient] = useState({
    clientName: '',
    clientAddress: '',
  })

// items description containing name, price and quantity
  const [items, setItems] = useState([{ name: '', quantity: 0, price: 0}]);

  const handleBillFromData = (e) => {
    e.preventDefault();
    const {name, value} = e.target;  
    setBillFrom({
      ...billFrom,
      [name] : value
    })
  }

  const handleClientData = (e) => {
    e.preventDefault();
    const {name, value} = e.target;  
    setClient({
      ...client,
      [name] : value
    })
  }

  const handleItemChange = (e, index, field, value) => {
    e.preventDefault();
    const updatedItems = [...items];
    updatedItems[index][field] = value; // updating the item field (using index) according to user's input

    setItems(updatedItems);  // updating the items array
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 0, price: 0}]);  // adding new item to items array
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1); // removing the selected item

    setItems(updatedItems);  // updating the items array 
  };

// to compute the items' total amount
  const total = () => {
    return items.map(({price, quantity}) => price * quantity).reduce((acc, currValue) => acc + currValue, 0);
  }

  return (
    <div className="invoice">
      <div>
        <h1 className='title'>Invoice</h1>

        <div className='firstRow'>
          <div className='inputName'>
            <label>Invoice Number:</label>
            <input name="invoiceNumber" className="input" type="text" value={billFrom.invoiceNumber} onChange={handleBillFromData} />
          </div>
        </div>

        <div className='firstRow'>
          <div className='inputName'>
            <label>Name:</label>
            <input name="name" className="input" type="text" value={billFrom.name} onChange={handleBillFromData} />
          </div>
          <div className='inputName'>
            <label>Address:</label>
            <textarea name="address" className="textarea" type="text" value={billFrom.address} onChange={handleBillFromData} />
          </div>
        </div>

        <hr/>

        <h2>Bill To:</h2>

        <div className='firstRow'>
          <div className='inputName'>
            <label>Client Name:</label>
            <input name="clientName" className="input" type="text" value={client.clientName} onChange={handleClientData} />
          </div>
          <div className='inputName'>
            <label>Address:</label>
            <textarea name="clientAddress" className="textarea" type="text" value={client.clientAddress} onChange={handleClientData} />
          </div>
        </div>

        <h2 className='title'>Add Details</h2>
        <div className='subTitleSection'>
          <h2 className='subTitle item'>Item</h2>
          <h2 className='subTitle quantity'>Quantity</h2>
          <h2 className='subTitle price'>Price</h2>
          <h2 className='subTitle action'>Amount</h2>
        </div>

        {items?.map((item, index) => (
          <div key={index} className='firstRow'>
            <input className="input item"
              type="text"
              value={item.name}
              onChange={(e) => handleItemChange(e, index, 'name', e.target.value)}
              placeholder="Item Name"
            />
            <input className="input quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(e, index, 'quantity', e.target.value)}
              placeholder="Quantity"
            />
            <input className="input price"
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(e, index, 'price', e.target.value)}
              placeholder="Price"
            />
            <p className='amount'>$ {item.quantity * item.price}</p>
            <button className='button' onClick={() => handleRemoveItem(index)}>-</button>
          </div>
        ))}
        <button className='button' onClick={handleAddItem}>+</button>
        <hr/>

        <div className='total'>
          <p>Total:</p>
          <p>{total()}</p>
        </div>
        <hr/>

        <PDFDownloadLink document={<InvoicePDF billFrom={billFrom} client={client} total={total} items={items} />} fileName={"Invoice.pdf"} >
          {({ blob, url, loading, error }) =>
                loading ? "Loading..." : <button className='button'>Print Invoice</button>
              }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default InvoiceForm;