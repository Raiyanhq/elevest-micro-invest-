import { useEffect } from "react";

function calcRoundUp(amount) {
    const ceil = Math.ceil(amount);
    const diff = +(ceil - amount).toFixed(2);
    return diff === 1 ? 0 : diff;
}

function computeStats(transactions) {
    if (transactions.length === 0) {
        return {
            totalRoundUps: 0,
            estimatedWeekly: 0,
            estimatedYearly: 0
        };
    }

    const totalRoundUps = transactions.reduce(
        (sum, tx) => sum + calcRoundUp(tx.amount),
        0
    );

    // Estimate weekly from average per transaction * assumed 20 transactions/week
    const avgPerTx = totalRoundUps / transactions.length;
    const estimatedWeekly = avgPerTx * 20;
    const estimatedYearly = estimatedWeekly * 52;

    return { totalRoundUps, estimatedWeekly, estimatedYearly };
}

export default function SavingsSummary({ transactions, onWeeklyChange }) {
    const { totalRoundUps, estimatedWeekly, estimatedYearly } =
        computeStats(transactions);

    // notify parent when weekly estimate changes
    useEffect(() => {
        if (onWeeklyChange) {
            onWeeklyChange(estimatedWeekly);
        }
    }, [estimatedWeekly, onWeeklyChange]);

    return (
        <div className="summary-grid">
            <div className="card summary-card">
                <h3>Total Round-Ups (Sample)</h3>
                <p className="amount">${totalRoundUps.toFixed(2)}</p>
                <span className="hint">
          From the transactions you’ve added in this demo
        </span>
            </div>
            <div className="card summary-card">
                <h3>Estimated Weekly Savings</h3>
                <p className="amount">${estimatedWeekly.toFixed(2)}</p>
                <span className="hint">
          Assuming similar spending with everyday round-ups
        </span>
            </div>
            <div className="card summary-card">
                <h3>Projected Yearly Savings</h3>
                <p className="amount">${estimatedYearly.toFixed(2)}</p>
                <span className="hint">
          Without even changing your habits — just round-ups
        </span>
            </div>
        </div>
    );
}
