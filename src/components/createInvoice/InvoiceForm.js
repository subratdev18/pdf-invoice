import React,  {  useState }  from 'react'; 
import {  Input,  InputNumber,  Button,  Alert,  Divider,  DatePicker }  from 'antd'; 
import dayjs from 'dayjs'; 
import TableComponent from '../table'; 
import InvoicePDF from '../getPDF/InvoicePDF'; 
//  import ShowPreview from '../showPreview'; 
import {  PDFDownloadLink,  PDFViewer }  from '@react-pdf/renderer';
import InvoiceQRCode from '../invoiceQRCode';
import './styles.css'; 
 
//  import customParseFormat from 'dayjs/plugin/customParseFormat'; 
//  dayjs.extend(customParseFormat); 
 
const dateFormat = 'DD/MM/YYYY'; 
 
const {  TextArea }  = Input; 
 
const InvoiceForm = () => { 
  const [logo,  setLogo] = useState('')
   
//  items description containing name,  price and quantity 
  const [items,  setItems] = useState([ 
    {  key: 0,  itemDescription: '',  quantity: 1,  price: 1,  amount: 1 } ,  
  ]); 
 
//  state for storing info about user creating Invoice 
  const [billFrom,  setBillFrom] = useState({  
    name: '', 
    address: '', 
    invoiceId: 1, 
    invoiceDate: dayjs(), 
    dueDate: dayjs() 
  } )

//  state for capturing info of person who needs to pay 
  const [client,  setClient] = useState({ 
    clientName: '', 
    clientAddress: '', 
  } )

  const handleBillFromData = (e) => { 
    e.preventDefault(); 
    const { name,  value}  = e.target;   
    setBillFrom({ 
      ...billFrom, 
      [name] : value
    } ) 
  }  

  const handleInvoiceDates = (date,  dateString) => { 
      console.log("date,  dateString ",  date,  dateString)

      setBillFrom({ 
        ...billFrom, 
        [date] : dateString
      } )
  } 

  const handleClientData = (e) => { 
    e.preventDefault(); 
    const { name,  value}  = e.target;   
    setClient({ 
      ...client, 
      [name] : value 
    } )
  } 

//  to compute the items' total amount
  // const total = () => { 
  //   return items.map(({ price,  quantity} ) => price * quantity).reduce((acc,  currValue) => acc + currValue,  0); 
  // } 

  const total = () => {
    return items.reduce((sum, { price,  quantity}) => sum + quantity * price, 0).toFixed(2);
  };

  const handleImage = (e) => { 
    console.log(e.target.files[0])
    setLogo(e.target.files[0])

    //  console.log("logo - ",  logo,  logo.length)

    //  handleUpload functionality
    const data = new FormData(); 
    data.append("file",  e.target.files[0])
    data.append("upload_preset",  "pdfinvoice")
    data.append("cloud_name",  "dmbqyr2hs")

    fetch("https:// api.cloudinary.com/v1_1/dmbqyr2hs/image/upload", { 
      method:"post", 
      body: data
    } )
    .then(res => res.json())
    .then(data => { 
      console.log(data); 
      data.url.slice(1,  0); 
      data.url.slice(0,  -1); 
      //  console.log("uploadi mage ",  data.url)
      setLogo(data.url)
    } )
    .catch(err => { 
      showAlert(); 
      console.log(err)
    } )
  } 

  const showAlert = () => { 
    return <Alert message="Error" type="error" showIcon />
  } 

  return (
    <form>
      <div className="invoice">
        <div>
          <h1 className='title'>Invoice</h1>

          <div className='uploadContainer'>
            <input type="file" name="file" accept="image/png,  image/jpeg" onChange={ e => handleImage(e)} />
          </div>

          <div className='invoiceDatesAndNo'>
            <div className='invoiceDatesAndNoContainer'>
              <label>Invoice No. :</label>
              <Input
                name="invoiceId"
                className="inputContainer"
                value={ billFrom.invoiceId}  
                onChange={ handleBillFromData} 
              />
            </div>
            <div className='invoiceDatesAndNoContainer'>
              <label>Invoice Date:</label>
              <DatePicker 
                name="invoiceDate"
                className="dateInputContainer"
                value={ billFrom.invoiceDate}  
                format={ dateFormat} 
                onChange={ (date) => handleInvoiceDates("invoiceDate",  date)}  
              />
            </div>
            <div className='invoiceDatesAndNoContainer'>
              <label>Due Date:</label>
              <DatePicker 
                name="dueDate"
                className="dateInputContainer"
                //  minDate={ dayjs('14/07/2024',  dateFormat)} 
                value={ billFrom.dueDate} 
                format={ dateFormat} 
                onChange={ (date) => handleInvoiceDates("dueDate",  date)}  
              />
            </div>
          </div>

          <div className='details'>
            <div className='detailsChild'>
              <h2>Your Details</h2>

              <div className='inputName'>
                <label>Name:</label>
                <Input 
                  name="name"
                  className="input" 
                  value={ billFrom.name}  
                  onChange={ handleBillFromData} 
                  allowClear 
                />
              </div>

              <div className='inputName'>
                <label>Address:</label>
                <TextArea 
                  name="address" 
                  className="textarea"
                  value={ billFrom.address}  
                  onChange={ handleBillFromData}  
                  allowClear
                />
              </div>
            </div>

            <Divider type="vertical" />

            <div className='detailsChild'>
              <h2>Client Details</h2>

              <div className='inputName'>
                <label>Client Name:</label>
                <Input 
                  name="clientName" 
                  className="input" 
                  value={ client.clientName}  
                  onChange={ handleClientData}  
                  allowClear 
                />
              </div>

              <div className='inputName'>
                <label>Address:</label>
                <TextArea 
                  name="clientAddress" 
                  className="textarea" 
                  value={ client.clientAddress}  
                  onChange={ handleClientData} 
                  allowClear 
                />
              </div>
            
            </div>
            
          </div>

          <hr/>

          <h2 className='title'>Add Details</h2>

          <TableComponent 
            items={ items}  
            setItems={ setItems} 
          />

          <div className='total'>
            <p>Total:</p>
            <p>{ total()} </p>
          </div>
          <hr/>

          <InvoiceQRCode billFrom={billFrom}  client={client}  totalAmount={total}  items={items} />

          <PDFDownloadLink document={ <InvoicePDF logo={ logo}  billFrom={ billFrom}  client={ client}  total={ total}  items={ items}  />}  fileName={ `Invoice-${ billFrom.invoiceId} .pdf`}  >
            { ({  blob,  url,  loading,  error } ) =>
                  loading ? "Loading..." : <Button type="primary" className='button'>Print Invoice</Button>
                } 
          </PDFDownloadLink>
        </div>
      { /* { 
            <PDFViewer width='800' height={ 800}  showToolbar={ false}  document={ <InvoicePDF billFrom={ billFrom}  client={ client}  total={ total}  items={ items}  />}  >
                <InvoicePDF billFrom={ billFrom}  client={ client}  total={ total}  items={ items}  />
            </PDFViewer>
        }  */} 
      </div>
      {/* <ShowPreview billFrom={ billFrom}  client={ client}  items={ items}  total={ total}  /> */}
    </form>
  ); 
} ; 

export default InvoiceForm; 
