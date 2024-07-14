import React, { useState } from 'react'
import { Button } from 'antd';
import { PDFViewer } from '@react-pdf/renderer';
import InvoicePDF from '../getPDF/InvoicePDF';

const ShowPreview = ({billFrom, client, total, items}) => {

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
        <Button type="primary" onClick={() => setShowPreview(!showPreview)}> Preview </Button>
        {
            showPreview ? 
            <PDFViewer width={900} height={500} showToolbar={false} document={<InvoicePDF billFrom={billFrom} client={client} total={total} items={items} />} >
                <InvoicePDF billFrom={billFrom} client={client} total={total} items={items} />
            </PDFViewer>
          : null
        }
    </div>
  )
}

export default ShowPreview
