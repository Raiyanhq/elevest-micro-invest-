export default function RiskProfileForm({ riskProfile, onChange }) {
    return (
        <div className="card risk-card">
            <h2>Risk Profile</h2>
            <p className="hint">
                Tell us how bold you are. We’ll shape the ETF mix &amp; growth
                assumptions.
            </p>

            <div className="risk-options">
                <label>
                    <input
                        type="radio"
                        name="risk"
                        value="conservative"
                        checked={riskProfile === "conservative"}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <span>Conservative</span>
                </label>

                <label>
                    <input
                        type="radio"
                        name="risk"
                        value="balanced"
                        checked={riskProfile === "balanced"}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <span>Balanced</span>
                </label>

                <label>
                    <input
                        type="radio"
                        name="risk"
                        value="aggressive"
                        checked={riskProfile === "aggressive"}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <span>Aggressive</span>
                </label>
            </div>
        </div>
    );
}
