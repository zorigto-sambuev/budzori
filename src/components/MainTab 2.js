// src/pages/MainTab.js
import React, { useState } from 'react';
import Modal from './ModalAddTransaction'; // Assuming you have a custom modal component
import DatePicker from './DatePicker'; // Import the DatePicker component

function MainTab({ addTransaction }) {
    const [showModal, setShowModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }));
    // const [transactions, setTransactions] = useState([]);
    const [showBanner, setShowBanner] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false); // Controls DatePicker visibility
    // Category-to-Note Options Mapping
    const noteOptions = {
        Earnings: ['Company', 'Verdana', 'Taurus', 'Simpson', 'Corp', 'Other'],
        Bills: ['HOA', 'Internet', 'Gas', 'Water', 'Phone', 'Electricity', 'Insurance', 'Daycare', 'Other'],
        "Credit Cards": ['Apple', 'Banana', 'Clorix', 'Slade', 'Unlimited', 'RoundCo'],
        Loans: ['Capital', 'Bester', 'Begger', 'Landos'],
        Subs: ['PlayStation', 'Spotify', 'Ring', 'Youtube', 'GoogleOne', 'iCloud', 'Leaf', 'OneDrive', 'GitHub', 'Linkedin', 'Carwash', 'Chatter', 'Other'],
        Mortgage: ['Lennar', 'EdgeHome'],
        Invest: ['Coinbase', 'CryptoCom']
    };

    // Toggle main modal
    const toggleModal = () => setShowModal(!showModal);

    // Save transaction and close modal
    const handleSave = () => {
        const newTransaction = {
            date,
            category,
            note,
            amount: parseFloat(amount).toFixed(2),
        };
        addTransaction(newTransaction);
        setShowModal(false);
        setShowBanner(true);
        setAmount('');
        setCategory('');
        setNote('');
        setDate(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }));

        // Hide banner after 3 seconds
        setTimeout(() => setShowBanner(false), 3000);
    };

    // Handle date selection
    const handleDateSelect = (selectedDate) => {
        setDate(selectedDate);
        setShowDatePicker(false); // Close DatePicker after selecting a date
    };

    // Determine if the selected category has specific note options
    const hasNoteOptions = category && noteOptions[category];

    return (
        <div className="main-tab">
            <h1>Dashboard</h1>
            <p>This is where you can view a summary and interact with the main functionalities of your budgeting
                app.</p>
            <button className="add-transaction-button" onClick={toggleModal}>Add Transaction</button>

            {showBanner && <div className="banner">Transaction Saved</div>}

            {/* Main Transaction Modal */}
            {showModal && (
                <Modal onClose={toggleModal}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <button onClick={toggleModal} className="cancel-button">Cancel</button>
                            <h2>Add Transaction</h2>
                        </div>
                        <div className="modal-content">
                            {/* Amount Section */}
                            <div className="modal-field">
                                <label>Amount</label>
                                <div className="amount-input">
                                    <span>USD</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Category Section */}
                            <div className="modal-field">
                                <label>Select Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="" disabled>Select category</option>
                                    <option value="Earnings">Earnings</option>
                                    <option value="Invest">Invest</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Credit Cards">Credit Cards</option>
                                    <option value="Loans">Loans</option>
                                    <option value="Mortgage">Mortgage</option>
                                    <option value="Subs">Subs</option>
                                </select>
                            </div>

                            {/* Note Section */}
                            <div className="modal-field">
                                <label>Note</label>
                                {hasNoteOptions ? (
                                    <select value={note} onChange={(e) => setNote(e.target.value)}>
                                        <option value="" disabled>Select note</option>
                                        {noteOptions[category].map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder="Add note"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                )}
                            </div>

                            {/* Date Section */}
                            <div className="modal-field">
                                <label>Date</label>
                                <input
                                    type="text"
                                    value={date}
                                    readOnly
                                    onClick={() => setShowDatePicker(true)} // Open DatePicker on click
                                />
                            </div>

                            {/* Save Button */}
                            <button onClick={handleSave} className="save-button">Save</button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* DatePicker Modal */}
            {showDatePicker && (
                <Modal onClose={() => setShowDatePicker(false)}>
                    <DatePicker
                        initialDate={new Date()}
                        onDateSelect={handleDateSelect}
                        onClose={() => setShowDatePicker(false)} // Close DatePicker on selection or outside click
                    />
                </Modal>
            )}
        </div>
    );
}

export default MainTab;
