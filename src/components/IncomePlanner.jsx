import { useEffect, useMemo } from "react";

export default function IncomePlanner({
                                          salary,
                                          onSalaryChange,
                                          investPercent,
                                          onInvestPercentChange,
                                          transactions,
                                          onMonthlyInvestChange
                                      }) {
    const monthlyExpenses = useMemo(
        () =>
            transactions.reduce((sum, tx) => {
                return sum + (tx.amount || 0);
            }, 0),
        [transactions]
    );

    const leftover = Math.max((salary || 0) - monthlyExpenses, 0);
    const monthlyInvest = leftover * (investPercent / 100);
    const monthlySave = leftover - monthlyInvest;

    useEffect(() => {
        if (onMonthlyInvestChange) {
            onMonthlyInvestChange(monthlyInvest);
        }
    }, [monthlyInvest, onMonthlyInvestChange]);

    return (
        <div className="card income-card">
            <div className="income-header-row">
                <div>
                    <h2>Income &amp; Smart Budget</h2>
                    <p className="hint">
                        Let Elevest automatically split what’s left after expenses into
                        smart savings and investing.
                    </p>
                </div>
                <button type="button" className="secondary-btn">
                    Live plan ✓
                </button>
            </div>

            <div className="income-grid">
                <div className="income-inputs">
                    <div className="form-row themed-input">
                        <label>Monthly Salary ($)</label>
                        <input
                            type="number"
                            min="0"
                            step="100"
                            placeholder="3000"
                            value={salary || ""}
                            onChange={(e) => onSalaryChange(parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div className="form-row">
                        <label>
                            Invest % of leftover after expenses:{" "}
                            <strong>{investPercent}%</strong>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={investPercent}
                            onChange={(e) =>
                                onInvestPercentChange(parseInt(e.target.value, 10) || 0)
                            }
                        />
                        <span className="hint">
              Drag to decide how aggressive your monthly investing should be.
            </span>
                    </div>
                </div>

                <div className="income-stats">
                    <div className="stat-pill">
                        <span className="stat-label">Monthly Expenses (from entries)</span>
                        <span className="stat-value">${monthlyExpenses.toFixed(2)}</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-label">Leftover After Expenses</span>
                        <span className="stat-value">${leftover.toFixed(2)}</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-label">Invest / month</span>
                        <span className="stat-value highlight">
              ${monthlyInvest.toFixed(2)}
            </span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-label">Save / month</span>
                        <span className="stat-value">
              ${monthlySave.toFixed(2)}
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
