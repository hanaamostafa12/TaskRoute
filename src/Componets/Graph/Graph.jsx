import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Graph.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setCustomers(response.data.customers);
        setTransactions(response.data.transactions);
      })
      .catch(error => console.log(error));
  }, []);

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const filteredTransactions = transactions.filter(
    transaction => transaction.customer_id === Number(selectedCustomer)
  );

  const data = {
    labels: [...new Set(filteredTransactions.map(transaction => transaction.date))],
    datasets: [
      {
        label: 'Transaction Amount',
        data: filteredTransactions.map(transaction => transaction.amount),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="graph-container">
      <select onChange={handleCustomerChange} className="form-control my-3">
        <option value="">Select Customer</option>
        {customers.map(customer => (
          <option key={customer.id} value={customer.id}>{customer.name}</option>
        ))}
      </select>
      {selectedCustomer && <Line data={data} />}
    </div>
  );
}

export default Graph;
