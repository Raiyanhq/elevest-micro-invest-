export default function ETFRecommendations({
                                               etfs,
                                               riskProfile,
                                               selectedEtfSymbol,
                                               onSelectEtf
                                           }) {
    if (!etfs || etfs.length === 0) return null;

    return (
        <div className="card etf-card">
            <h2>Suggested ETF Mix</h2>
            <p className="hint">
                Based on a <strong>{riskProfile}</strong> profile. Click one to see its
                projected profit using your current plan.
            </p>
            <div className="etf-grid">
                {etfs.map((etf) => {
                    const isSelected = etf.symbol === selectedEtfSymbol;
                    return (
                        <button
                            key={etf.symbol}
                            type="button"
                            className={
                                "etf-pill-btn" + (isSelected ? " etf-pill-btn-selected" : "")
                            }
                            onClick={() => onSelectEtf(etf.symbol)}
                        >
                            <div className="etf-header">
                                <span className="symbol">{etf.symbol}</span>
                                <span className={`risk-tag risk-${etf.risk.toLowerCase()}`}>
                  {etf.risk}
                </span>
                            </div>
                            <p className="etf-name">{etf.name}</p>
                            <p className="etf-desc">{etf.description}</p>
                            <p className="etf-return">
                                Expected yearly return:{" "}
                                <strong>{(etf.expectedReturn * 100).toFixed(1)}%</strong>
                            </p>
                            {isSelected && (
                                <p className="etf-selected-label">Selected for profit view</p>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
