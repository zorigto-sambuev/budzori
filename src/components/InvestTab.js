import React, {useState} from 'react';
import Header from './Header';
import FullHistoryModal from './FullHistoryModal';
import SummaryTable from './SummaryTable';
import './InvestTab.css';

function InvestTab({ transactions }) {
    const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
    const investTransactions = transactions
        .filter(transaction => transaction.category === 'Invest')
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    // const latestTransactions = investTransactions.slice(0,-10);
    const [selectedMonth] = useState(new Date().getMonth());
    const [selectedYear] = useState(new Date().getFullYear());
    const [category] = useState('Invest');
    const openFullHistoryModal = () => setShowFullHistoryModal(true);
    const closeFullHistoryModal = () => setShowFullHistoryModal(false);

    return (
        <div>
            <Header />
            <h1>Invest</h1>
            <p>Track all your investing here.</p>
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
                    {investTransactions.length > 0 ? (
                        investTransactions.slice(0, 5).map((transaction, index) => (
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
                    {investTransactions.length > 5 && (
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
                    transactions={investTransactions}
                    onClose={closeFullHistoryModal}
                />
            )}
        </div>
    );
}

export default InvestTab;