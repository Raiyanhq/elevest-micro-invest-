import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length) return null;
    const value = payload[0].value;

    return (
        <div className="chart-tooltip">
            <div className="chart-tooltip-header">Week {label}</div>
            <div className="chart-tooltip-body">
                <span className="chart-tooltip-label">Projected value</span>
                <span className="chart-tooltip-value">${value.toFixed(2)}</span>
            </div>
        </div>
    );
}

export default function ProjectionChart({
                                            data,
                                            riskProfile,
                                            selectedEtf,
                                            profitStats
                                        }) {
    return (
        <div className="card chart-card">
            <h2>1-Year Projection</h2>
            <p className="hint">
                Live projection using your weekly contributions and a{" "}
                <strong>{riskProfile}</strong> strategy.
            </p>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="week" />
                        <YAxis tickFormatter={(val) => `$${val}`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#38bdf8"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            isAnimationActive={true}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {selectedEtf && profitStats && (
                <div className="profit-summary">
                    <div className="profit-row">
                        <span className="profit-label">Selected ETF</span>
                        <span className="profit-value">
              {selectedEtf.symbol} · {(selectedEtf.expectedReturn * 100).toFixed(
                            1
                        )}
                            %/yr
            </span>
                    </div>
                    <div className="profit-grid">
                        <div className="profit-pill">
                            <span className="profit-label">Total contributions (1 yr)</span>
                            <span className="profit-value">
                ${profitStats.totalContrib.toFixed(2)}
              </span>
                        </div>
                        <div className="profit-pill">
                            <span className="profit-label">Projected value (1 yr)</span>
                            <span className="profit-value">
                ${profitStats.finalValue.toFixed(2)}
              </span>
                        </div>
                        <div className="profit-pill">
                            <span className="profit-label">Estimated profit</span>
                            <span className="profit-value profit-highlight">
                +${profitStats.profit.toFixed(2)}
              </span>
                        </div>
                        <div className="profit-pill">
                            <span className="profit-label">Avg profit per week</span>
                            <span className="profit-value">
                ${profitStats.weeklyProfit.toFixed(2)}
              </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
