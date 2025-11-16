function calcRoundUp(amount) {
    const ceil = Math.ceil(amount);
    const diff = +(ceil - amount).toFixed(2);
    return diff === 1 ? 0 : diff; // if already whole, round-up = 0
}

export default function TransactionList({
                                            transactions,
                                            onRemove,
                                            selectedMonth
                                        }) {
    if (transactions.length === 0) {
        return (
            <div className="card transaction-list empty">
                <p>
                    No transactions for <strong>{selectedMonth}</strong> yet. Add a few to
                    see your round-ups grow.
                </p>
            </div>
        );
    }

    return (
        <div className="card transaction-list">
            <h2>
                Transactions for <span className="month-chip">{selectedMonth}</span>
            </h2>
            <table>
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Month</th>
                    <th>Date</th>
                    <th>Amount ($)</th>
                    <th>Round-Up ($)</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((tx) => (
                    <tr key={tx.id}>
                        <td>{tx.description}</td>
                        <td>{tx.month}</td>
                        <td>{tx.date}</td>
                        <td>{tx.amount.toFixed(2)}</td>
                        <td>{calcRoundUp(tx.amount).toFixed(2)}</td>
                        <td>
                            <button
                                type="button"
                                className="ghost-btn danger"
                                onClick={() => onRemove(tx.id)}
                            >
                                ✕
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
