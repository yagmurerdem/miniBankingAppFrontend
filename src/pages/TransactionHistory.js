import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionHistory = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API'den işlem geçmişini çekme
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        // Backend API URL (localhost veya dağıtım ortamına göre değişebilir)
        const response = await axios.get(`/api/transactions/account/${accountId}`);
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to fetch transaction history.");
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchTransactions();
    }
  }, [accountId]);

  // Yükleme, hata veya işlem geçmişi durumlarını gösterme
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found for this account.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>From Account</th>
              <th>To Account</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.from.name}</td>
                <td>{transaction.to.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.status}</td>
                <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
