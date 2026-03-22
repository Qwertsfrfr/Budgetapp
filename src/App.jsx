import React, { useMemo, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";

const initialTransactions = [
  {
    id: 1,
    name: "Campus Cafe",
    category: "Food",
    amount: -8.45,
    time: "Today, 11:24 AM",
  },
  {
    id: 2,
    name: "Lab Supplies",
    category: "Classes",
    amount: -24.99,
    time: "Yesterday, 4:10 PM",
  },
  {
    id: 3,
    name: "Scholarship Deposit",
    category: "Income",
    amount: 850.0,
    time: "Jan 30, 9:02 AM",
  },
  {
    id: 4,
    name: "Ride Share",
    category: "Transport",
    amount: -12.3,
    time: "Jan 29, 6:47 PM",
  },
];

const capsules = [
  { label: "Food", value: 210, limit: 320, accent: "mint" },
  { label: "Housing", value: 540, limit: 580, accent: "sky" },
  { label: "Books", value: 88, limit: 160, accent: "peach" },
  { label: "Transport", value: 120, limit: 150, accent: "lilac" },
];

const features = [
  {
    title: "Semester Runway",
    desc: "Forecast how long your balance lasts based on class weeks and breaks.",
    tag: "AI Forecast",
  },
  {
    title: "Roommate Split",
    desc: "Track shared bills and auto-calc who owes who with swipe-ready totals.",
    tag: "Shared",
  },
  {
    title: "Textbook Watch",
    desc: "Price alerts for required books and campus deals.",
    tag: "Savings",
  },
  {
    title: "Meal Plan Optimizer",
    desc: "Find the cheapest meal combo and nudge you before swipes expire.",
    tag: "Campus",
  },
  {
    title: "Focus Rewards",
    desc: "Earn streaks for staying under target and lock-in micro-savings.",
    tag: "Gamified",
  },
  {
    title: "Emergency Buffer",
    desc: "Auto-moves spare cash into a rainy-day pocket.",
    tag: "Safety",
  },
];

const resources = [
  {
    title: "Textbook Deal Finder",
    desc: "Track required books, compare rental vs. used, and auto-alert on drops.",
    tag: "Savings",
  },
  {
    title: "Major Resource Hub",
    desc: "Curated free tools, tutorials, and career prep by major.",
    tag: "Academic",
  },
  {
    title: "Campus Deal Radar",
    desc: "Student discounts near campus with weekly pushes.",
    tag: "Local",
  },
  {
    title: "Syllabus Spend Forecast",
    desc: "Detect fees and material costs before the term starts.",
    tag: "Planning",
  },
];

const tips = [
  {
    title: "Move $18 to Buffer",
    desc: "You’re 12% under budget this week. Want to stash the extra?",
  },
  {
    title: "Library vs. Bookstore",
    desc: "Save $64 by borrowing your Bio 201 textbook before Feb 12.",
  },
  {
    title: "Meal Plan Sweet Spot",
    desc: "Switch to 10 meals/week and save ~$42 this month.",
  },
];

const goals = [
  { label: "Spring Break Trip", progress: 62, target: "$480 / $780" },
  { label: "Emergency Buffer", progress: 38, target: "$190 / $500" },
  { label: "New Laptop", progress: 74, target: "$890 / $1,200" },
];

const chartBars = [60, 48, 72, 80, 52, 44, 64, 90, 58, 69];

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    desc: "Core budgeting + resources",
    perks: ["Budget capsules", "Textbook alerts", "Major resource hub"],
  },
  {
    name: "Campus+",
    price: "$6 / mo",
    desc: "Smart forecasting and roommates",
    perks: ["Semester runway", "Roommate splits", "Deal radar"],
  },
  {
    name: "Launch",
    price: "$12 / mo",
    desc: "Investing 101 + goal automation",
    perks: ["Investing guides", "Auto-savings", "Priority support"],
  },
];

const investingModules = [
  {
    title: "Compounding 101",
    desc: "See how small weekly deposits grow over semesters.",
    tag: "Basics",
  },
  {
    title: "Risk vs. Reward",
    desc: "Learn why diversification beats single bets.",
    tag: "Core",
  },
  {
    title: "Starter Portfolios",
    desc: "Mock ETF mixes you can simulate without money.",
    tag: "Simulate",
  },
  {
    title: "Glossary",
    desc: "Plain language for yield, expense ratio, and more.",
    tag: "Learn",
  },
];

function formatCurrency(value) {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  return `${sign}$${abs.toFixed(2)}`;
}

function TopBar({ onOpenDrawer }) {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="topbar">
      <div className="logo">
        <span className="logo-dot" />
        PulseBudget
      </div>
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/investing">Investing 101</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <div className="cta">
        {isDashboard ? (
          <button className="primary" onClick={onOpenDrawer}>
            Add Transaction
          </button>
        ) : (
          <>
            <button className="ghost">Log in</button>
            <button className="primary">Create account</button>
          </>
        )}
      </div>
    </header>
  );
}

function Landing({ safeToSpend }) {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Student budgeting that feels alive</p>
          <h1>
            Build a money rhythm for the semester. Track spending, get proactive
            nudges, and make your goals feel inevitable.
          </h1>
          <p className="subtext">
            PulseBudget blends campus-specific budgeting, smart alerts, and
            animation-rich insights so your money story is clear at a glance.
          </p>
          <div className="hero-actions">
            <button className="primary">Create your account</button>
            <button className="secondary">Compare plans</button>
          </div>
          <div className="hero-badges">
            <span>Real-time safe-to-spend</span>
            <span>Semester runway</span>
            <span>Roommate split</span>
          </div>
        </div>
        <div className="hero-card">
          <div className="card-header">
            <div>
              <p className="muted">Join in under 60 seconds</p>
              <h2>Start with a campus profile</h2>
            </div>
            <div className="chip positive">No credit card</div>
          </div>
          <div className="auth-form">
            <label>
              Email
              <input placeholder="you@email.com" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Create a password" />
            </label>
            <button className="primary" type="button">
              Create account
            </button>
            <button className="ghost" type="button">
              Continue with Google
            </button>
            <p className="tiny muted">
              Already have an account? <span className="link">Log in</span>
            </p>
          </div>
          <div className="hero-stats">
            <div>
              <p className="muted">Safe to spend</p>
              <h3>{formatCurrency(safeToSpend)}</h3>
              <span className="tiny">This week</span>
            </div>
            <div>
              <p className="muted">Next bill</p>
              <h3>$120</h3>
              <span className="tiny">Dorm rent · Feb 5</span>
            </div>
            <div>
              <p className="muted">Runway</p>
              <h3>9.4 weeks</h3>
              <span className="tiny">At current pace</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="section-title">
          <h2>What makes it different</h2>
          <p className="muted">
            Campus-aware intelligence with an interface that feels alive.
          </p>
        </div>
        <div className="features">
          {features.map((feature) => (
            <div className="feature" key={feature.title}>
              <span className="tag">{feature.tag}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <button className="ghost">Explore</button>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-grid">
        <div className="section-title">
          <h2>Free resources, real savings</h2>
          <p className="muted">
            Stretch your budget with academic and campus perks built in.
          </p>
        </div>
        <div className="features">
          {resources.map((resource) => (
            <div className="feature" key={resource.title}>
              <span className="tag">{resource.tag}</span>
              <h3>{resource.title}</h3>
              <p>{resource.desc}</p>
              <button className="ghost">View resources</button>
            </div>
          ))}
        </div>
      </section>

      <section className="metrics">
        <div>
          <p className="muted">Active students</p>
          <h2>18,420</h2>
        </div>
        <div>
          <p className="muted">Average monthly savings</p>
          <h2>$86</h2>
        </div>
        <div>
          <p className="muted">Goals funded</p>
          <h2>9,312</h2>
        </div>
      </section>
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Start in minutes</p>
          <h1>Set up your student money system.</h1>
          <p className="subtext">
            Create a profile, pick your goals, and get a personalized budget
            plan right away.
          </p>
        </div>
        <div className="form-card">
          <h2>Create your account</h2>
          <form className="stack">
            <label>
              Full name
              <input placeholder="Alex Johnson" />
            </label>
            <label>
              Email
              <input placeholder="alex@email.com" />
            </label>
            <label>
              Major
              <input placeholder="Computer Science" />
            </label>
            <label>
              School
              <input placeholder="Your university" />
            </label>
            <label>
              Weekly budget goal
              <input placeholder="$200" />
            </label>
            <button className="primary" type="button">
              Continue
            </button>
          </form>
          <p className="tiny muted">
            Already have an account? <span className="link">Log in</span>
          </p>
        </div>
      </section>
      <section className="steps">
        <div className="step-card">
          <h3>1. Connect your routines</h3>
          <p>Link a card, meal plan, or just start manual.</p>
        </div>
        <div className="step-card">
          <h3>2. Set semester goals</h3>
          <p>Trips, tech, and emergency buffers get auto-funded.</p>
        </div>
        <div className="step-card">
          <h3>3. Activate smart nudges</h3>
          <p>Push alerts that keep you in control, not overwhelmed.</p>
        </div>
      </section>
    </div>
  );
}

function DashboardPage({ transactions, onOpenDrawer }) {
  return (
    <div className="page">
      <section className="dashboard">
        <div className="dashboard-left">
          <div className="section-title">
            <h2>Budget capsules</h2>
            <button className="ghost">Edit categories</button>
          </div>
          <div className="capsules">
            {capsules.map((cap) => {
              const percent = Math.min((cap.value / cap.limit) * 100, 100);
              return (
                <div className={`capsule ${cap.accent}`} key={cap.label}>
                  <div>
                    <p className="muted">{cap.label}</p>
                    <h3>${cap.value}</h3>
                    <span className="tiny">of ${cap.limit}</span>
                  </div>
                  <div className="meter">
                    <div style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="section-title">
            <h2>Smart nudges</h2>
            <button className="ghost">Personalize</button>
          </div>
          <div className="nudges">
            {tips.map((tip) => (
              <div className="nudge" key={tip.title}>
                <h3>{tip.title}</h3>
                <p>{tip.desc}</p>
                <button className="secondary">Apply</button>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-right">
          <div className="mini-card">
            <div className="section-title">
              <h2>Spending pulse</h2>
              <span className="pill">Live</span>
            </div>
            <div className="bar-chart">
              {chartBars.map((bar, index) => (
                <div key={index} style={{ height: `${bar}%` }} />
              ))}
            </div>
            <div className="legend">
              <span>Highest: Fri</span>
              <span>Lowest: Tue</span>
            </div>
          </div>

          <div className="mini-card">
            <div className="section-title">
              <h2>Goals in motion</h2>
              <button className="ghost">New goal</button>
            </div>
            <div className="goals">
              {goals.map((goal) => (
                <div className="goal" key={goal.label}>
                  <div className="goal-header">
                    <h3>{goal.label}</h3>
                    <span>{goal.target}</span>
                  </div>
                  <div className="goal-bar">
                    <div style={{ width: `${goal.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mini-card">
            <div className="section-title">
              <h2>Roommate split</h2>
              <span className="pill">3 people</span>
            </div>
            <div className="split-grid">
              <div>
                <p className="muted">You</p>
                <h3>$52.40</h3>
              </div>
              <div>
                <p className="muted">Alex</p>
                <h3>$43.10</h3>
              </div>
              <div>
                <p className="muted">Sam</p>
                <h3>$36.75</h3>
              </div>
            </div>
            <button className="secondary">Settle up</button>
          </div>
        </div>
      </section>

      <section className="transactions">
        <div className="section-title">
          <h2>Live transactions</h2>
          <button className="ghost" onClick={onOpenDrawer}>
            Add new
          </button>
        </div>
        <div className="transactions-list">
          {transactions.map((item) => (
            <div className="transaction" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p className="muted">
                  {item.category} · {item.time}
                </p>
              </div>
              <span
                className={
                  item.amount >= 0 ? "amount positive" : "amount negative"
                }
              >
                {formatCurrency(item.amount)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ResourcesPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Resource hub</p>
          <h1>Every free perk your major deserves.</h1>
          <p className="subtext">
            Find textbook deals, free software, internships, and study tools in
            one place.
          </p>
        </div>
        <div className="form-card">
          <h2>Filter resources</h2>
          <form className="stack">
            <label>
              Major
              <input placeholder="Biology, CS, Business" />
            </label>
            <label>
              Class
              <input placeholder="BIO 201" />
            </label>
            <label>
              Resource type
              <input placeholder="Textbooks, software, grants" />
            </label>
            <button className="primary" type="button">
              Apply filters
            </button>
          </form>
        </div>
      </section>

      <section className="features">
        {resources.map((resource) => (
          <div className="feature" key={resource.title}>
            <span className="tag">{resource.tag}</span>
            <h3>{resource.title}</h3>
            <p>{resource.desc}</p>
            <button className="ghost">Open resource</button>
          </div>
        ))}
      </section>
    </div>
  );
}

function InvestingPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Investing 101</p>
          <h1>Learn investing without the pressure.</h1>
          <p className="subtext">
            Build confidence with short lessons, simulators, and risk-friendly
            templates.
          </p>
        </div>
        <div className="form-card">
          <h2>Starter simulator</h2>
          <form className="stack">
            <label>
              Weekly deposit
              <input placeholder="$10" />
            </label>
            <label>
              Timeline
              <input placeholder="2 years" />
            </label>
            <label>
              Risk comfort
              <input placeholder="Low / Medium / High" />
            </label>
            <button className="primary" type="button">
              Run simulation
            </button>
          </form>
        </div>
      </section>

      <section className="features">
        {investingModules.map((module) => (
          <div className="feature" key={module.title}>
            <span className="tag">{module.tag}</span>
            <h3>{module.title}</h3>
            <p>{module.desc}</p>
            <button className="ghost">Start lesson</button>
          </div>
        ))}
      </section>

      <section className="metrics">
        <div>
          <p className="muted">Starter target</p>
          <h2>$15 / week</h2>
        </div>
        <div>
          <p className="muted">Average student portfolio</p>
          <h2>$1,240</h2>
        </div>
        <div>
          <p className="muted">Time to first $100</p>
          <h2>7 weeks</h2>
        </div>
      </section>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Pricing</p>
          <h1>Plans built for student budgets.</h1>
          <p className="subtext">
            Start free and upgrade when you want smarter forecasting or
            investing lessons.
          </p>
        </div>
      </section>
      <section className="pricing-grid">
        {pricingPlans.map((plan) => (
          <div className="pricing-card" key={plan.name}>
            <h3>{plan.name}</h3>
            <h2>{plan.price}</h2>
            <p className="muted">{plan.desc}</p>
            <ul>
              {plan.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <button className="primary">Choose plan</button>
          </div>
        ))}
      </section>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Make PulseBudget yours.</h1>
          <p className="subtext">
            Control alerts, budgets, and how your money is categorized.
          </p>
        </div>
      </section>
      <section className="settings-grid">
        <div className="settings-card">
          <h3>Notifications</h3>
          <p className="muted">Choose which nudges you want to receive.</p>
          <div className="toggle-list">
            <label>
              <input type="checkbox" defaultChecked /> Weekly budget check-in
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Textbook price alerts
            </label>
            <label>
              <input type="checkbox" /> Investing lesson reminders
            </label>
          </div>
        </div>
        <div className="settings-card">
          <h3>Budget preferences</h3>
          <p className="muted">Set your default weekly limit and categories.</p>
          <button className="secondary">Edit budgets</button>
        </div>
        <div className="settings-card">
          <h3>Connected accounts</h3>
          <p className="muted">Manage cards, meal plans, and payout sources.</p>
          <button className="secondary">Manage connections</button>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Food",
    amount: "",
  });

  const balance = useMemo(() => {
    const total = transactions.reduce((sum, item) => sum + item.amount, 0);
    return 1450.75 + total;
  }, [transactions]);

  const safeToSpend = useMemo(() => {
    const weeklyBudget = 210;
    const spent = transactions
      .filter((item) => item.amount < 0)
      .reduce((sum, item) => sum + Math.abs(item.amount), 0);
    return Math.max(weeklyBudget - spent, 0);
  }, [transactions]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.amount) return;
    const amount = Number(form.amount);
    const newItem = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      amount: amount,
      time: "Just now",
    };
    setTransactions((prev) => [newItem, ...prev]);
    setForm({ name: "", category: "Food", amount: "" });
    setDrawerOpen(false);
  }

  return (
    <div className="app">
      <div className="bg">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />
        <div className="grid" />
      </div>

      <TopBar onOpenDrawer={() => setDrawerOpen(true)} />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Landing safeToSpend={safeToSpend} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                transactions={transactions}
                onOpenDrawer={() => setDrawerOpen(true)}
              />
            }
          />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/investing" element={<InvestingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>

      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>New transaction</h2>
          <button className="ghost" onClick={() => setDrawerOpen(false)}>
            Close
          </button>
        </div>
        <form className="drawer-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Ex: Bookstore"
            />
          </label>
          <label>
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, category: event.target.value }))
              }
            >
              <option>Food</option>
              <option>Housing</option>
              <option>Transport</option>
              <option>Classes</option>
              <option>Fun</option>
              <option>Income</option>
            </select>
          </label>
          <label>
            Amount
            <input
              value={form.amount}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, amount: event.target.value }))
              }
              placeholder="-18.50"
            />
          </label>
          <button className="primary" type="submit">
            Save transaction
          </button>
        </form>
        <div className="drawer-note">
          <p>Tip: Use negative numbers for expenses, positive for income.</p>
        </div>
      </div>
    </div>
  );
}
