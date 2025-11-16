import { useEffect, useMemo, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SavingsSummary from "./components/SavingsSummary";
import RiskProfileForm from "./components/RiskProfileForm";
import ProjectionChart from "./components/ProjectionChart";
import ETFRecommendations from "./components/ETFRecommendations";
import IncomePlanner from "./components/IncomePlanner";
import ETF_DATA from "./data/mockEtfs";

function generateProjection(weeklyContribution, riskProfile) {
    if (!weeklyContribution || weeklyContribution <= 0) return [];

    const yearlyRateMap = {
        conservative: 0.04,
        balanced: 0.07,
        aggressive: 0.12
    };

    const yearlyRate = yearlyRateMap[riskProfile] || 0.07;
    const weeklyRate = Math.pow(1 + yearlyRate, 1 / 52) - 1;

    const weeks = 52;
    let balance = 0;
    const data = [];

    for (let week = 1; week <= weeks; week++) {
        balance = (balance + weeklyContribution) * (1 + weeklyRate);
        data.push({
            week,
            value: +balance.toFixed(2)
        });
    }

    return data;
}

function getEtfForRisk(riskProfile) {
    return ETF_DATA[riskProfile] || ETF_DATA["balanced"];
}

function computeEtfProfit(weeklyContribution, etf) {
    if (!weeklyContribution || !etf) return null;

    const yearlyRate = etf.expectedReturn ?? 0.07;
    const weeklyRate = Math.pow(1 + yearlyRate, 1 / 52) - 1;
    const weeks = 52;
    let balance = 0;

    for (let w = 1; w <= weeks; w++) {
        balance = (balance + weeklyContribution) * (1 + weeklyRate);
    }

    const totalContrib = weeklyContribution * weeks;
    const profit = balance - totalContrib;

    return {
        totalContrib,
        finalValue: balance,
        profit,
        weeklyProfit: profit / weeks
    };
}

export default function App() {
    const [transactions, setTransactions] = useState([]);
    const [riskProfile, setRiskProfile] = useState("balanced");

    const [selectedMonth, setSelectedMonth] = useState("November");

    const [weeklyFromRoundUps, setWeeklyFromRoundUps] = useState(0);

    const [salary, setSalary] = useState(0);
    const [investPercent, setInvestPercent] = useState(50);
    const [monthlyInvest, setMonthlyInvest] = useState(0);

    const [selectedEtfSymbol, setSelectedEtfSymbol] = useState(null);

    const activeTransactions = useMemo(
        () =>
            transactions.filter(
                (tx) => tx.month === selectedMonth
            ),
        [transactions, selectedMonth]
    );

    const totalWeeklyContribution = useMemo(() => {
        const weeklyFromSalary = monthlyInvest > 0 ? monthlyInvest / 4.33 : 0;
        return +(weeklyFromRoundUps + weeklyFromSalary).toFixed(2);
    }, [weeklyFromRoundUps, monthlyInvest]);

    const etfs = useMemo(
        () => getEtfForRisk(riskProfile),
        [riskProfile]
    );

    const projectionData = useMemo(
        () => generateProjection(totalWeeklyContribution, riskProfile),
        [totalWeeklyContribution, riskProfile]
    );

    const selectedEtf = useMemo(() => {
        if (!etfs || etfs.length === 0) return null;
        if (selectedEtfSymbol) {
            const found = etfs.find((e) => e.symbol === selectedEtfSymbol);
            if (found) return found;
        }
        return etfs[0];
    }, [etfs, selectedEtfSymbol]);

    const profitStats = useMemo(
        () => computeEtfProfit(totalWeeklyContribution, selectedEtf),
        [totalWeeklyContribution, selectedEtf]
    );

    const handleAddTransaction = (tx) => {
        setTransactions((prev) => [tx, ...prev]);
    };

    const handleRemoveTransaction = (id) => {
        setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    };

    useEffect(() => {
        if (transactions.length === 0) {
            const seedMonth = "November";
            const seed = [
                {
                    id: 1,
                    description: "Coffee",
                    amount: 4.75,
                    date: "2025-11-10",
                    month: seedMonth
                },
                {
                    id: 2,
                    description: "Uber ride",
                    amount: 12.3,
                    date: "2025-11-11",
                    month: seedMonth
                },
                {
                    id: 3,
                    description: "Lunch",
                    amount: 9.4,
                    date: "2025-11-12",
                    month: seedMonth
                }
            ];
            setTransactions(seed);
        }
    }, []); // run once

    useEffect(() => {
        if (etfs && etfs.length > 0) {
            setSelectedEtfSymbol((prev) => {
                if (prev && etfs.some((e) => e.symbol === prev)) return prev;
                return etfs[0].symbol;
            });
        }
    }, [etfs]);

    return (
        <div className="app-root">
            {/* HERO SECTION */}
            <header className="hero">
                <div className="hero-orb hero-orb-1"/>
                <div className="hero-orb hero-orb-2"/>
                <div className="hero-orb hero-orb-3"/>
                <div className="hero-inner">

                    <div className="hero-title-shell">
                        <h1 className="hero-title">Elevest</h1>
                        <p className="hero-tagline">
                            Elevate every swipe into long-term wealth.
                        </p>
                    </div>

                    <p className="hero-subtitle">
                        Turn spare change, salary leftovers, and ETF portfolios into a live,
                        interactive projection of your financial future.
                    </p>
                </div>

            </header>

            {/* FULL-WIDTH DASHBOARD FRAME */}
            <section className="dashboard-shell">
                <div className="dashboard-frame">
                    <main className="app-main">
                        <section className="left-column">
                            <TransactionForm
                                onAdd={handleAddTransaction}
                                selectedMonth={selectedMonth}
                                onMonthChange={setSelectedMonth}
                            />
                            <TransactionList
                                transactions={activeTransactions}
                                onRemove={handleRemoveTransaction}
                                selectedMonth={selectedMonth}
                            />
                        </section>

                        <section className="right-column">
                            <SavingsSummary
                                transactions={activeTransactions}
                                onWeeklyChange={setWeeklyFromRoundUps}
                            />

                            <IncomePlanner
                                salary={salary}
                                onSalaryChange={setSalary}
                                investPercent={investPercent}
                                onInvestPercentChange={setInvestPercent}
                                transactions={activeTransactions}
                                onMonthlyInvestChange={setMonthlyInvest}
                            />

                            <RiskProfileForm
                                riskProfile={riskProfile}
                                onChange={setRiskProfile}
                            />

                            <ETFRecommendations
                                etfs={etfs}
                                riskProfile={riskProfile}
                                selectedEtfSymbol={selectedEtfSymbol}
                                onSelectEtf={setSelectedEtfSymbol}
                            />
                        </section>
                    </main>

                    {/* FULL-WIDTH, CENTERED CHART ROW */}
                    <div className="chart-full-width">
                        <ProjectionChart
                            data={projectionData}
                            riskProfile={riskProfile}
                            selectedEtf={selectedEtf}
                            profitStats={profitStats}
                        />
                    </div>
                </div>

                <footer className="app-footer">
                    <span>Elevest · Demo · Not financial advice · Built at HackNYU 🚀</span>
                </footer>
            </section>
        </div>
    );
}
