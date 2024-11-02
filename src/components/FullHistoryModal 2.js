import React from 'react';
import './FullHistoryModal.css';

function FullHistoryModal({ transactions, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Full History</h2>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Note</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.date}</td>
                                <td>{transaction.note}</td>
                                <td>${transaction.amount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FullHistoryModal;
