import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerTable.css';

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setCustomers(response.data.customers);
        setTransactions(response.data.transactions);
      })
      .catch(error => console.log(error));
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="customer-table">
      <div className="filter-inputs">
        <input 
          type="text" 
          placeholder="Filter by name" 
          value={filter} 
          onChange={e => setFilter(e.target.value)} 
          className="form-control mb-3"
        />
        <input 
          type="number" 
          placeholder="Filter by transaction amount" 
          value={amountFilter} 
          onChange={e => setAmountFilter(e.target.value)} 
          className="form-control mb-3"
        />
      </div>
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => {
            const totalAmount = transactions
              .filter(transaction => transaction.customer_id === customer.id)
              .reduce((total, transaction) => total + transaction.amount, 0);
            if (amountFilter && totalAmount < amountFilter) {
              return null;
            }
            return (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{totalAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
