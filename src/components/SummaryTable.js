// src/components/SummaryTable.js
import React from 'react';
import noteOptions from '../utils/noteOptions';

function SummaryTable({ transactions, selectedMonth, selectedYear, category }) {
    const categoryNotes = noteOptions[category] || [];
    // Filter transactions by selected month, year, and category
    const groupedTransactions = transactions
        .filter(transaction => transaction.category === category)
        .reduce((acc, transaction) => {
            const transactionDate = new Date(transaction.date);
            const monthYear = `${transactionDate.getFullYear()}-${transactionDate.getMonth()}`;

            if (!acc[monthYear]) {
                acc[monthYear] = { date: transactionDate, summary: {} };
            }

            // Summarize the amount by note type
            if (categoryNotes.includes(transaction.note)) {
                if (!acc[monthYear].summary[transaction.note]) {
                    acc[monthYear].summary[transaction.note] = 0;
                }
                acc[monthYear].summary[transaction.note] += parseFloat(transaction.amount);
            }
            return acc;
        }, {});

    // Sort the grouped transactions by date in descending order
    const sortedGroupedTransactions = Object.keys(groupedTransactions)
        .sort((a, b) => new Date(groupedTransactions[b].date) - new Date(groupedTransactions[a].date))
        .map(key => ({ monthYear: key, ...groupedTransactions[key] }));

    // Determine which notes are active based on available transaction data
    const activeNotes = Array.from(
        new Set(
            sortedGroupedTransactions.flatMap(({ summary }) => Object.keys(summary))
        )
    );

    return (
        <div>
            <h2>{`Summary for ${category}`}</h2>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    {activeNotes.map(note => (
                        <th key={note}>{note}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {sortedGroupedTransactions.map(({monthYear, date, summary}) => (
                    <tr key={monthYear}>
                        <td>{date.toLocaleString('default', {month: 'short', year: 'numeric'})}</td>
                        {activeNotes.map(note => (
                            <td key={note}>{summary[note] ? summary[note].toFixed(2) : '-'}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SummaryTable;
