import React, {useState} from 'react';
import Header from './Header';
import FullHistoryModal from './FullHistoryModal';
import SummaryTable from './SummaryTable';
import './EarningsTab.css';

function EarningsTab({ transactions }) {
    const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
    const earningsTransactions = transactions
        .filter(transaction => transaction.category === 'Earnings')
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestTransactions = earningsTransactions.slice(0,-10);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [category, setCategory] = useState('Earnings');
    // Toggle modal visibility
    const openFullHistoryModal = () => setShowFullHistoryModal(true);
    const closeFullHistoryModal = () => setShowFullHistoryModal(false);

    return (
        <div>
            <Header />
            <h1>Earnings</h1>
            <p>Track all your earnings here.</p>
            <h2>History</h2>
            <div className="earnings-table">
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Note</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {earningsTransactions.length > 0 ? (
                        earningsTransactions.slice(0, 5).map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.date}</td>
                                <td>{transaction.note}</td>
                                <td>${transaction.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No records found</td>
                        </tr>
                    )}
                    {earningsTransactions.length > 5 && (
                        <tr onClick={openFullHistoryModal} style={{ cursor: 'pointer', textAlign: 'center' }}>
                            <td colSpan="3">...</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <SummaryTable
                transactions={transactions}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                category={category}
            />
            {showFullHistoryModal && (
                <FullHistoryModal
                    transactions={earningsTransactions}
                    onClose={closeFullHistoryModal}
                />
            )}
        </div>
    );
}

export default EarningsTab;
