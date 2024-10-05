import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import ItemsTable from './ItemsTable';
import InvoiceQRCode from '../invoiceQRCode';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  name: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontSize: 22,
    marginBottom: 5
  },
  invoiceNumber: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    marginBottom: 10,
    paddingBottom: 5,
  },
  client: {
    borderTopWidth: 1,
    marginTop: 20,
    marginBottom: 10
  },
  imageContainer: {
    flexDirection: 'row-reverse',
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: "contain",
    borderRadius: 6,
  }
});

const InvoicePDF = ({ logo, billFrom, client, total, items }) => { // destructuring props
  // console.log("dueDate : ", billFrom)

  // const invoiceDetails = {
  //   billFrom,
  //   client,
  //   total,
  //   items
  // }

  return (
    <Document>
      {/* {invoiceDetails?.items && <InvoiceQRCode billFrom={billFrom}  client={client}  total={total}  items={items} /> } */}

      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>Invoice Form</Text>
          <View style={styles.imageContainer}>
            <Image src={logo} style={styles.logo}/>
          </View>
          <View>
            <Text style={styles.name}>{billFrom.name}</Text>
          </View>

          <View style={styles.invoiceNumber}>
            <Text style={styles.label}>INVOICE NO.</Text>
            <Text style={styles.input}>{billFrom.invoiceNumber}</Text>
          </View>

          <View style={styles.invoiceNumber}>
            <Text style={styles.label}>Invoice Date</Text>
            <Text style={styles.input}>{billFrom.invoiceDate?.toString()}</Text>
          </View>

          <View style={styles.invoiceNumber}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.input}>{billFrom?.dueDate?.toString()}</Text>
          </View>

          <View style={styles.invoiceNumber}>
            <Text style={styles.label}>ADDRESS</Text>
            <Text style={styles.input}>{billFrom.address}</Text>
          </View>
          
          <View style={styles.client}></View>
          
          <Text style={styles.label}>BILL TO</Text>
          
          <View>
            <Text style={styles.name}>{client.clientName}</Text>
          </View>

          <View style={styles.invoiceNumber}>
            <Text style={styles.label}>CLIENT ADDRESS</Text>
            <Text style={styles.input}>{client.clientAddress}</Text>
          </View>

          <ItemsTable items={items} total={total} />

        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
