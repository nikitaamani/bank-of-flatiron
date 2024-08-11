import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import SearchBar from './SearchBar';
import toast from 'react-hot-toast';

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/nikitaamani/phase-2-code-challenge/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        toast.error('Error fetching transactions.');
        console.error('Error fetching transactions:', error);
      });
  }, []);

  const handleAddTransaction = (newTransaction) => {
    fetch('https://my-json-server.typicode.com/nikitaamani/phase-2-code-challenge/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions((prevTransactions) => [...prevTransactions, data]);
        toast.success('Transaction added successfully!');
      })
      .catch((error) => {
        toast.error('Error adding transaction.');
        console.error('Error adding transaction:', error);
      });
  };

  const handleDeleteTransaction = (id) => {
    fetch(`https://my-json-server.typicode.com/nikitaamani/phase-2-code-challenge/transactions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.id !== id)
        );
        toast.success('Transaction deleted successfully!');
      })
      .catch((error) => {
        toast.error('Error deleting transaction.');
        console.error('Error deleting transaction:', error);
      });
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="transaction-table-container">
      <SearchBar onSearchTermChange={handleSearchTermChange} />
      <Form onAddTransaction={handleAddTransaction} />
      <Table
        transactions={filteredTransactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}

export default TransactionTable;
