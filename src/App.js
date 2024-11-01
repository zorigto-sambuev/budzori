// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import MainTab from './components/MainTab';
import EarningsTab from './components/EarningsTab';
import InvestTab from './components/InvestTab';
import BillsTab from './components/BillsTab';
import CreditCardsTab from './components/CreditCardsTab';
import LoansTab from './components/LoansTab';
import MortgageTab from './components/MortgageTab';
import SubsTab from './components/SubsTab';

import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  // Load transactions from local storage on initial load
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  // Save transactions to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);
  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
      <Router>
        <div className="app">
          <Header/>
          <Routes>
            <Route path="/" element={<MainTab addTransaction={addTransaction}/>}/>
            <Route path="/earnings" element={<EarningsTab transactions={transactions}/>}/>
            <Route path="/invest" element={<InvestTab transactions={transactions}/>}/>
            <Route path="/bills" element={<BillsTab transactions={transactions}/>}/>
            <Route path="/credit-cards" element={<CreditCardsTab transactions={transactions}/>}/>
            <Route path="/loans" element={<LoansTab transactions={transactions}/>}/>
            <Route path="/mortgage" element={<MortgageTab transactions={transactions}/>}/>
            <Route path="/subs" element={<SubsTab transactions={transactions}/>}/>
          </Routes>
        </div>
      </Router>
  );
}

// Header component with a tags
function Header() {
  const navigate = useNavigate();

  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
      <nav>
        <a href="/" onClick={(e) => handleNavigation(e, '/')}> Main </a>
        <a href="/earnings" onClick={(e) => handleNavigation(e, '/earnings')}> Earnings </a>
        <a href="/invest" onClick={(e) => handleNavigation(e, '/invest')}> Invest </a>
        <a href="/bills" onClick={(e) => handleNavigation(e, '/bills')}> Bills </a>
        <a href="/credit-cards" onClick={(e) => handleNavigation(e, '/credit-cards')}> Credit Cards </a>
        <a href="/loans" onClick={(e) => handleNavigation(e, '/loans')}> Loans </a>
        <a href="/mortgage" onClick={(e) => handleNavigation(e, '/mortgage')}> Mortgage </a>
        <a href="/subs" onClick={(e) => handleNavigation(e, '/subs')}> Subs </a>
      </nav>
  );
}

export default App;
