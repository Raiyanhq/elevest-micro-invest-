import { useState } from "react";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export default function TransactionForm({
                                            onAdd,
                                            selectedMonth,
                                            onMonthChange
                                        }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount) return;

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) return;

        onAdd({
            id: Date.now(),
            description: description || "Purchase",
            amount: parsedAmount,
            date: date || new Date().toISOString().slice(0, 10),
            month: selectedMonth || "January"
        });

        setDescription("");
        setAmount("");
        setDate("");
    };

    return (
        <form className="card transaction-form" onSubmit={handleSubmit}>
            <div className="month-selector-row">
                <div>
                    <h2>Add Transaction</h2>
                    <p className="hint">
                        Choose a month and log expenses for that specific period.
                    </p>
                </div>

                <div className="month-select-wrapper">
                    <label className="month-label">Active Month</label>
                    <select
                        className="month-select"
                        value={selectedMonth}
                        onChange={(e) => onMonthChange(e.target.value)}
                    >
                        {MONTHS.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <label>Description</label>
                <input
                    type="text"
                    placeholder="Coffee, Uber, Groceries..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-row">
                <label>Amount ($)</label>
                <input
                    type="number"
                    step="0.01"
                    placeholder="4.75"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            <div className="form-row">
                <label>Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <button type="submit" className="primary-btn">
                Add &amp; Round Up
            </button>
        </form>
    );
}
