import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: '#D3D3D3',
        borderTopColor: 'black',
        borderTopWidth: 1,
        borderBottomColor: 'black',
        fontStyle: 'bold',
        alignItems: 'center',
        height: 22,
      },
      quantity: {
        width: '10%',
        borderRightWidth: 1,
        textAlign: 'right',
        borderRightColor: '#000000',
        paddingRight: 10,
      },
      description: {
          width: '60%',
          borderRightColor: '#000000',
          borderRightWidth: 1,
          textAlign: 'left',
          paddingLeft: 10,
      },
      price: {
        width: '15%',
        borderRightColor: '#000000',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 10,
      },
      amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 10,
      },
      total: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }
})

const ItemsTable = ({ items, total }) => { // destructuring props
  return (
    <View>
        <View style={styles.row}>
            <Text style={styles.description}>Item Description</Text>
            <Text style={styles.quantity}>Qty</Text>
            <Text style={styles.price}>Price</Text>
            <Text style={styles.amount}>Amount</Text>
        </View>

        { 
            items.map((item, index) => (
            <View key={index} style={styles.row}>
                <Text style={styles.description}>{item.name}</Text>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.amount}>$ {item.quantity * item.price}</Text>
            </View>
        ))}

        <View style={styles.total}>
            <Text>Total: </Text>
            <Text>$ {total()} </Text>
        </View>
    </View>

  )
}

export default ItemsTable;