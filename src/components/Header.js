// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional for styling

const Header = () => {
    return (
        <nav className="top-menu">
            <Link to="/main">Main</Link>
            <Link to="/earnings">Earnings</Link>
            <Link to="/invest">Invest</Link>
            <Link to="/bills">Bills</Link>
            <Link to="/credit-cards">Credit Cards</Link>
            <Link to="/loans">Loans</Link>
            <Link to="/mortgage">Mortgage</Link>
            <Link to="/subs">Subs</Link>
        </nav>
    );
};

export default Header;
