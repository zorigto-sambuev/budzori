import React, {useState} from 'react';
import Header from './Header';
import FullHistoryModal from './FullHistoryModal';
import SummaryTable from './SummaryTable';
import './InvestTab.css';

function MortgageTab({ transactions }) {
    const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
    const mortgageTransactions = transactions
        .filter(transaction => transaction.category === 'Mortgage')
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [category, setCategory] = useState('Mortgage');
    const openFullHistoryModal = () => setShowFullHistoryModal(true);
    const closeFullHistoryModal = () => setShowFullHistoryModal(false);

    return (
        <div>
            <Header />
            <h1>Mortgage</h1>
            <p>Track all your mortgage here.</p>
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
                    {mortgageTransactions.length > 0 ? (
                        mortgageTransactions.slice(0, 5).map((transaction, index) => (
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
                    {mortgageTransactions.length > 5 && (
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
                    transactions={mortgageTransactions}
                    onClose={closeFullHistoryModal}
                />
            )}
        </div>
    );
}

export default MortgageTab;