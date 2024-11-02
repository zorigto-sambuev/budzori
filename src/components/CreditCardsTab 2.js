import React, {useState} from 'react';
import FullHistoryModal from './FullHistoryModal';
import SummaryTable from './SummaryTable';
import './InvestTab.css';

function CreditCardsTab({ transactions }) {
    const [showFullHistoryModal, setShowFullHistoryModal] = useState(false);
    const creditCardsTransactions = transactions
        .filter(transaction => transaction.category === 'Credit Cards')
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [category, setCategory] = useState('Credit Cards');
    const openFullHistoryModal = () => setShowFullHistoryModal(true);
    const closeFullHistoryModal = () => setShowFullHistoryModal(false);
    return (
        <div>
            <h1>Credit Cards</h1>
            <p>Track all your credit cards here.</p>
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
                    {creditCardsTransactions.length > 0 ? (
                        creditCardsTransactions.slice(0, 5).map((transaction, index) => (
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
                    {creditCardsTransactions.length > 5 && (
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
                    transactions={creditCardsTransactions}
                    onClose={closeFullHistoryModal}
                />
            )}
        </div>
    );
}

export default CreditCardsTab;