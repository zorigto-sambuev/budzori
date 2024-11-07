import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import MainTab from './components/MainTab';
import EarningsTab from './components/EarningsTab';
import InvestTab from './components/InvestTab';
import BillsTab from './components/BillsTab';
import CreditCardsTab from './components/CreditCardsTab';
import LoansTab from './components/LoansTab';
import MortgageTab from './components/MortgageTab';
import SubsTab from './components/SubsTab';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import './App.css';

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const addTransaction = (transaction) => {
        setTransactions([transaction, ...transactions]);
    };

    useEffect(() => {
        // Check for token in local storage on initial load
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false); // Stop loading after checking for token
    }, [loading]);

    // Load transactions from local storage on initial load
    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(storedTransactions);
    }, []);

    // Save transactions to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);


    return (
        <Router>
            <Routes>
                <Route path="/" element={!isAuthenticated ? <Navigate to="/login"/> : <Navigate to="/main"/>}/>
                <Route path="/login" element={!isAuthenticated ? <LoginPage setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/main"/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/main" element={isAuthenticated ? <MainTab addTransaction={addTransaction}/> : <Navigate to="/login"/>}/>
                <Route path="/earnings" element={<EarningsTab transactions={transactions}/>}/>
                <Route path="/invest" element={<InvestTab transactions={transactions}/>}/>
                <Route path="/bills" element={<BillsTab transactions={transactions}/>}/>
                <Route path="/credit-cards" element={<CreditCardsTab transactions={transactions}/>}/>
                <Route path="/loans" element={<LoansTab transactions={transactions}/>}/>
                <Route path="/mortgage" element={<MortgageTab transactions={transactions}/>}/>
                <Route path="/subs" element={<SubsTab transactions={transactions}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
