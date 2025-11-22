# 🚀 Elevest — Smart Wealth Automation  
Transforming everyday spending into long-term wealth through intelligent automation, modern design, and real-time financial analytics.

---

## 📘 Overview  
**Elevest** is a next-generation budgeting + automated investing platform designed to make wealth-building effortless, educational, and visually engaging. It analyzes your **transactions**, **salary**, and **risk profile**, then automatically generates **investment projections**, **ETF recommendations**, and **profit forecasts** inside a premium Apple-inspired interface.

Instead of overwhelming users with spreadsheets and jargon, Elevest creates a calm, clean, and intelligent financial experience.

---

# ⭐ Inspiration  
Most financial tools are either too confusing or too boring. People want to invest, but they get stuck on:

- *“What ETFs should I buy?”*  
- *“How much should I save every month?”*  
- *“How do round-ups actually help?”*  
- *“What would my money look like in 1 year?”*

We wanted to take these complex ideas and make them **simple, automated, educational, and beautiful**.

> The goal:  
> **Turn everyday behavior into predictable long-term wealth — with the smooth, delightful feel of an Apple product.**

---

# 💡 What Elevest Does  
### 🔹 Smart Round-Up Investing  
Every purchase you log is rounded to the nearest dollar. The spare change becomes an automatic weekly investment contribution.

### 🔹 Month-Based Budgeting  
Pick a month → add transactions → Elevest calculates spending, round-ups, and investment potential.

### 🔹 Salary Allocation  
Enter your salary → Elevest computes:
- essential expenses  
- savings  
- investable leftovers  

### 🔹 ETF Recommendations  
Choose a risk level (Conservative / Balanced / Aggressive).  
Elevest recommends ETFs with:
- expected return  
- 1-year projection  
- estimated profit  

### 🔹 Live Interactive Projection Graph  
Powered by compound interest:

\[
A = P(1 + r/n)^{nt}
\]

Elevest projects **52 weeks of investment growth** in real time as inputs change.

### 🔹 Profit Analytics  
- Total contributions  
- Estimated 1-year profit  
- Average weekly profit  
- Comparison across ETFs  

### 🔹 Apple-Inspired UI  
- Smooth floating animations  
- Glassmorphism effects  
- Gradient glow elements  
- Centered dynamic hero section  
- Full-screen financial dashboard  

Elevest feels less like a hackathon project — and more like an actual fintech startup MVP.

---

# 🛠️ How It Was Built  
### 🧩 Technologies Used

#### **Frontend**
- **React** – modular UI components  
- **Vite** – ultra-fast dev server + build tooling  
- **JavaScript ES6+** – core logic + state management  
- **Recharts** – animated financial charts  
- **HTML5 / CSS3** – structure + professional styling  
- **Glassmorphism & Gradients** – premium design aesthetic  

#### **Technical Architecture**
- **Round-Up Engine**  
  Calculates nearest-dollar differences with precision.

- **Salary Allocation System**  
  Splits salary into expenses, savings, and investment portions.

- **ETF Return Model**  
  Uses expected annual return `r` to forecast **profit** & **balance**.

- **Compound Growth Engine**  
  Runs per-week compounding:
  \[
  A_{week} = A_{week-1}(1 + r/52) + contribution
  \]

- **State Management**  
  Built using:
  ``` js
  useState()
  useEffect()
  useMemo()
