// src/components/DatePicker.js
import React, { useState } from 'react';
// import './DatePicker.css';

function DatePicker({ initialDate, onDateSelect, onClose }) {
    const [currentDate, setCurrentDate] = useState(initialDate);

    // Get the month’s days and metadata
    const getMonthDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const startDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        return { year, month, startDay, daysInMonth };
    };

    const { year, month, startDay, daysInMonth } = getMonthDays(currentDate);

    // Change month or year
    const changeMonth = (offset) => {
        setCurrentDate(new Date(year, month + offset, 1));
    };

    const changeYear = (offset) => {
        setCurrentDate(new Date(year + offset, month, 1));
    };

    // Handle date click
    const handleDateClick = (day) => {
        const selectedDate = new Date(year, month, day);
        onDateSelect(selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }));
        onClose();
    };

    return (
        <div className="datepicker-modal">
            <div className="datepicker-header">
                <button onClick={() => changeYear(-1)}>«</button>
                <button onClick={() => changeMonth(-1)}>‹</button>
                <span>{currentDate.toLocaleString('en-GB', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => changeMonth(1)}>›</button>
                <button onClick={() => changeYear(1)}>»</button>
            </div>
            <div className="datepicker-days">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="day-header">{day}</div>
                ))}
                {Array.from({ length: startDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="empty-day"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isToday =
                        day === new Date().getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear();

                    return (
                        <div
                            key={day}
                            className={`day ${isToday ? 'today' : ''}`}
                            onClick={() => handleDateClick(day)}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DatePicker;
