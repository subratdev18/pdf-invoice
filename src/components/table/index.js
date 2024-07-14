import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
// import 'antd/dist/antd.css';

const TableComponent = ({ items, setItems }) => {

    const handleAddRow = () => {
    const newKey = items.length ? items[items.length - 1].key + 1 : 0;
    const newRow = { key: newKey, item: '', quantity: 0, price: 0, amount: 0 };
    setItems([...items, newRow]);
  };

  const handleRemoveRow = (key) => {
    const newRows = items.filter((row) => row.key !== key);
    setItems(newRows);
  };

  const handleChange = (key, name, value) => {
    const newRows = items.map((row) =>
      row.key === key
        ? { 
            ...row, 
            [name]: value, 
            amount: name === 'quantity' || name === 'price' ? (name === 'quantity' ? value * row.price : row.quantity * value) : row.amount 
        }
        : row
    );
    setItems(newRows);
  };

  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleChange(record.key, 'item', e.target.value)}
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (text, record) => (
        <Input
          type="number"
          value={text}
          onChange={(e) => handleChange(record.key, 'quantity', Number(e.target.value))}
        />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text, record) => (
        <Input
          type="number"
          value={text}
          onChange={(e) => handleChange(record.key, 'price', Number(e.target.value))}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text) => text.toFixed(2),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleRemoveRow(record.key)}>
          <Button disabled={items?.length == 1} style={{color: 'red'}}>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="App">
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        rowClassName={() => 'editable-row'}
      />
      <Button type="primary" onClick={handleAddRow} style={{ marginBottom: 16 }}>
        +
      </Button>
    </div>
  );
};

export default TableComponent;
