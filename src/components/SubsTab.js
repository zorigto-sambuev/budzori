import React, {useState} from 'react';
import Header from './Header';
import FullHistoryModal from './FullHistoryModal';
import SummaryTable from './SummaryTable';
import './InvestTab.css';

function SubsTab({ transactions }) {
    const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
    const subsTransactions = transactions
        .filter(transaction => transaction.category === 'Subs')
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    const [selectedMonth] = useState(new Date().getMonth());
    const [selectedYear] = useState(new Date().getFullYear());
    const [category] = useState('Subs');
    const openFullHistoryModal = () => setShowFullHistoryModal(true);
    const closeFullHistoryModal = () => setShowFullHistoryModal(false);
    return (
        <div>
            <Header />
            <h1>Subs</h1>
            <p>Track all your subscription here.</p>
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
                    {subsTransactions.length > 0 ? (
                        subsTransactions.slice(0, 5).map((transaction, index) => (
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
                    {subsTransactions.length > 5 && (
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
                    transactions={subsTransactions}
                    onClose={closeFullHistoryModal}
                />
            )}
        </div>
    );
}

export default SubsTab;