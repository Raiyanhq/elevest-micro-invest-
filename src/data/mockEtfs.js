const ETF_DATA = {
    conservative: [
        {
            symbol: "BND",
            name: "Vanguard Total Bond Market ETF",
            risk: "Low",
            expectedReturn: 0.03, // 3%/yr
            description: "Broad exposure to U.S. investment-grade bonds."
        },
        {
            symbol: "VTIP",
            name: "Vanguard Short-Term Inflation-Protected Securities ETF",
            risk: "Low",
            expectedReturn: 0.025, // 2.5%/yr
            description: "Short-term TIPS to help hedge inflation with low volatility."
        }
    ],
    balanced: [
        {
            symbol: "VTI",
            name: "Vanguard Total Stock Market ETF",
            risk: "Medium",
            expectedReturn: 0.08, // 8%/yr
            description: "Broad U.S. stock market exposure for long-term growth."
        },
        {
            symbol: "VXUS",
            name: "Vanguard Total International Stock ETF",
            risk: "Medium",
            expectedReturn: 0.075, // 7.5%/yr
            description: "Diversifies across global markets outside the U.S."
        }
    ],
    aggressive: [
        {
            symbol: "QQQ",
            name: "Invesco QQQ Trust",
            risk: "High",
            expectedReturn: 0.12, // 12%/yr
            description: "Tech-heavy Nasdaq exposure for high growth potential."
        },
        {
            symbol: "ARKK",
            name: "ARK Innovation ETF",
            risk: "High",
            expectedReturn: 0.15, // 15%/yr
            description: "Focus on disruptive innovation and high-risk, high-reward bets."
        }
    ]
};

export default ETF_DATA;
