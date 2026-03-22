import React, { useState } from "react";
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
    amount: 850,
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

const budgetCapsules = [
  { label: "Food", value: 210, limit: 320 },
  { label: "Housing", value: 540, limit: 580 },
  { label: "Books", value: 88, limit: 160 },
  { label: "Transport", value: 120, limit: 150 },
];

const dashboardCards = [
  {
    title: "Semester runway",
    value: "9.4 weeks",
    detail: "Assuming the last 21 days remain your spending baseline.",
  },
  {
    title: "Safe to spend",
    value: "$74.26",
    detail: "After dorm rent, subscriptions, and your buffer transfer.",
  },
  {
    title: "Shared expenses",
    value: "$132.25",
    detail: "Three roommate bills tracked with one tap settlement.",
  },
];

const features = [
  {
    title: "Textbook deal finder",
    copy: "Required books become tracked items with rental, used, and local resale comparisons.",
    tag: "Savings",
  },
  {
    title: "Major resource shelf",
    copy: "Each major gets a live set of scholarships, free tools, and study assets worth using.",
    tag: "Academic",
  },
  {
    title: "Meal plan optimizer",
    copy: "Use expiring swipes first, then shift to cash only when the math actually works.",
    tag: "Campus",
  },
  {
    title: "Emergency buffer",
    copy: "Small weekly surplus gets swept into a separate reserve without asking you to think about it.",
    tag: "Safety",
  },
];

const resources = [
  {
    title: "Free software by major",
    desc: "Design suites, IDEs, citation tools, and tutoring platforms grouped by discipline.",
    meta: "Updated weekly",
  },
  {
    title: "Textbook market board",
    desc: "Rental, used, PDF, library, and local listings side by side with price-drop alerts.",
    meta: "Best for semester planning",
  },
  {
    title: "Scholarships and grants",
    desc: "Niche awards filtered by year, program, and campus-specific eligibility.",
    meta: "Good fit for new users",
  },
  {
    title: "Syllabus spend forecast",
    desc: "Flag course fees and materials before they hit your budget mid-semester.",
    meta: "Works with uploaded syllabi",
  },
];

const investingLessons = [
  {
    title: "Compounding",
    summary: "See how small, boring weekly deposits build real long-term advantage.",
  },
  {
    title: "Index funds",
    summary: "A practical entry point for students who want broad exposure, not hype.",
  },
  {
    title: "Risk tolerance",
    summary: "Learn what volatility feels like before you commit actual money.",
  },
  {
    title: "Paper portfolio",
    summary: "Try allocations, track outcomes, and learn without any financial risk.",
  },
];

const pricingPlans = [
  {
    name: "Base",
    price: "$0",
    note: "Budgeting and campus resources",
    items: ["Transaction tracking", "Resource shelf", "Textbook watchlists"],
  },
  {
    name: "Semester",
    price: "$7",
    note: "Forecasting and collaboration",
    items: ["Runway model", "Roommate split", "Adaptive alerts"],
  },
  {
    name: "Launch",
    price: "$12",
    note: "Investing and automation",
    items: ["Investing 101", "Goal automation", "Priority support"],
  },
];

const settingsSections = [
  {
    title: "Notifications",
    body: "Control how often nudges arrive and which ones remain silent during class hours.",
  },
  {
    title: "Budget categories",
    body: "Rename or collapse categories so the dashboard reflects how you actually spend.",
  },
  {
    title: "Connections",
    body: "Manage cards, meal plans, and any future account linking from one place.",
  },
];

function formatCurrency(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(value).toFixed(2)}`;
}

function getBalance(transactions) {
  return 1450.75 + transactions.reduce((sum, item) => sum + item.amount, 0);
}

function StatStrip() {
  return (
    <div className="stat-strip">
      <span>18,420 active students</span>
      <span>$86 average monthly savings</span>
      <span>9,312 goals funded</span>
      <span>74 campus discount sources tracked</span>
    </div>
  );
}

function PageIntro({ kicker, title, copy, aside }) {
  return (
    <section className="page-intro">
      <div className="page-intro-copy">
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
        <p className="lede">{copy}</p>
      </div>
      {aside ? <div className="page-intro-aside">{aside}</div> : null}
    </section>
  );
}

function TopBar({ onOpenDrawer }) {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="topbar">
      <NavLink to="/" className="brand">
        <span className="brand-mark" />
        <div>
          <strong>PulseBudget</strong>
          <span>Student finance, sharpened.</span>
        </div>
      </NavLink>

      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/investing">Investing 101</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>

      <div className="toolbar">
        {isDashboard ? (
          <button className="button button-primary" onClick={onOpenDrawer}>
            Add transaction
          </button>
        ) : (
          <>
            <button className="button button-ghost">Log in</button>
            <button className="button button-primary">Create account</button>
          </>
        )}
      </div>
    </header>
  );
}

function LandingPage() {
  return (
    <div className="page">
      <PageIntro
        kicker="Editorial budgeting"
        title="A student money app that feels less like admin and more like control."
        copy="PulseBudget combines budgeting, textbook savings, campus-specific resources, and beginner investing into one sharply designed system."
        aside={
          <div className="hero-panel">
            <div className="hero-panel-top">
              <p>Current runway</p>
              <h2>9.4 weeks</h2>
            </div>
            <div className="hero-panel-grid">
              <div>
                <span>Safe to spend</span>
                <strong>$74.26</strong>
              </div>
              <div>
                <span>Textbook savings</span>
                <strong>$64</strong>
              </div>
              <div>
                <span>Buffer balance</span>
                <strong>$190</strong>
              </div>
              <div>
                <span>Shared bills</span>
                <strong>3 open</strong>
              </div>
            </div>
          </div>
        }
      />

      <StatStrip />

      <section className="split-layout">
        <div className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Why it lands</p>
            <h2>Built around how students actually spend.</h2>
          </div>
          <div className="feature-list">
            {features.map((feature) => (
              <article key={feature.title} className="feature-row">
                <div>
                  <span className="feature-tag">{feature.tag}</span>
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="signup-panel">
          <div className="panel-heading">
            <p className="eyebrow">Start free</p>
            <h2>Make a clean start.</h2>
          </div>
          <form className="stack">
            <label>
              Email
              <input placeholder="you@email.com" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Create a password" />
            </label>
            <button className="button button-primary" type="button">
              Create account
            </button>
            <button className="button button-ghost" type="button">
              Continue with Google
            </button>
          </form>
          <p className="small-copy">No credit card. Use manual tracking or connect accounts later.</p>
        </aside>
      </section>
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="page">
      <PageIntro
        kicker="Onboarding"
        title="Set your profile once. The app does the sorting after that."
        copy="Use your email, pick your school and major, then set the spending priorities you actually care about this semester."
        aside={
          <div className="info-card">
            <span>Setup time</span>
            <strong>Under 3 minutes</strong>
            <p>Manual mode is available if you do not want to connect any accounts.</p>
          </div>
        }
      />

      <section className="form-stage">
        <div className="form-card form-card-large">
          <h2>Create your account</h2>
          <form className="form-grid">
            <label>
              Full name
              <input placeholder="Alex Johnson" />
            </label>
            <label>
              Email
              <input placeholder="alex@email.com" />
            </label>
            <label>
              School
              <input placeholder="Your university" />
            </label>
            <label>
              Major
              <input placeholder="Computer Science" />
            </label>
            <label>
              Weekly budget
              <input placeholder="$200" />
            </label>
            <label>
              Main goal
              <input placeholder="Emergency buffer" />
            </label>
          </form>
          <button className="button button-primary" type="button">
            Continue
          </button>
        </div>

        <div className="rail-list">
          <article className="rail-item">
            <span>01</span>
            <div>
              <h3>Profile</h3>
              <p>School, major, schedule rhythm, and baseline spending habits.</p>
            </div>
          </article>
          <article className="rail-item">
            <span>02</span>
            <div>
              <h3>Goals</h3>
              <p>Trips, textbooks, devices, and reserve funds all become tracked targets.</p>
            </div>
          </article>
          <article className="rail-item">
            <span>03</span>
            <div>
              <h3>Automation</h3>
              <p>Alerts, sweeps, and reminders only where they reduce friction.</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

function DashboardPage({ transactions, onOpenDrawer }) {
  return (
    <div className="page">
      <PageIntro
        kicker="Dashboard"
        title="A dashboard that keeps the signal and drops the noise."
        copy="Core budget status, goal progress, and active spending patterns appear first. Everything else stays secondary."
        aside={
          <div className="info-card">
            <span>Current balance</span>
            <strong>{formatCurrency(getBalance(transactions))}</strong>
            <p>Updated from the sample transaction feed below.</p>
          </div>
        }
      />

      <section className="dashboard-shell">
        <div className="dashboard-main">
          <div className="budget-grid">
            {budgetCapsules.map((cap) => {
              const width = Math.min((cap.value / cap.limit) * 100, 100);
              return (
                <article key={cap.label} className="budget-card">
                  <div className="budget-card-head">
                    <span>{cap.label}</span>
                    <strong>${cap.value}</strong>
                  </div>
                  <div className="meter">
                    <div style={{ width: `${width}%` }} />
                  </div>
                  <p>${cap.limit} monthly limit</p>
                </article>
              );
            })}
          </div>

          <div className="transaction-block">
            <div className="section-heading section-heading-inline">
              <div>
                <p className="eyebrow">Activity</p>
                <h2>Recent transactions</h2>
              </div>
              <button className="button button-ghost" onClick={onOpenDrawer}>
                Add new
              </button>
            </div>
            <div className="transaction-list">
              {transactions.map((item) => (
                <article key={item.id} className="transaction-row">
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      {item.category} · {item.time}
                    </p>
                  </div>
                  <strong className={item.amount >= 0 ? "amount-positive" : "amount-negative"}>
                    {formatCurrency(item.amount)}
                  </strong>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="dashboard-rail">
          {dashboardCards.map((card) => (
            <article key={card.title} className="info-card">
              <span>{card.title}</span>
              <strong>{card.value}</strong>
              <p>{card.detail}</p>
            </article>
          ))}
        </aside>
      </section>
    </div>
  );
}

function ResourcesPage() {
  return (
    <div className="page">
      <PageIntro
        kicker="Resources"
        title="Make the app useful even before someone tracks their first dollar."
        copy="Textbook savings, free software, grants, and major-specific resources belong in the same system as budgeting because they directly change the outcome."
      />

      <section className="card-grid">
        {resources.map((resource) => (
          <article key={resource.title} className="resource-card">
            <span>{resource.meta}</span>
            <h2>{resource.title}</h2>
            <p>{resource.desc}</p>
            <button className="button button-ghost">Open resource</button>
          </article>
        ))}
      </section>
    </div>
  );
}

function InvestingPage() {
  return (
    <div className="page">
      <PageIntro
        kicker="Investing 101"
        title="Teach long-term money habits without turning the app into a trading product."
        copy="The investing layer stays educational and calm: simple lessons, paper portfolios, and plain-language risk framing."
        aside={
          <div className="hero-panel">
            <div className="hero-panel-top">
              <p>Starter example</p>
              <h2>$15 / week</h2>
            </div>
            <div className="hero-panel-grid">
              <div>
                <span>After 1 year</span>
                <strong>$780</strong>
              </div>
              <div>
                <span>After 4 years</span>
                <strong>$3,120</strong>
              </div>
            </div>
          </div>
        }
      />

      <section className="split-layout split-layout-tight">
        <div className="lesson-list">
          {investingLessons.map((lesson, index) => (
            <article key={lesson.title} className="lesson-row">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.summary}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="simulator-card">
          <p className="eyebrow">Paper portfolio</p>
          <h2>Run a no-risk simulation.</h2>
          <form className="stack">
            <label>
              Weekly amount
              <input placeholder="$15" />
            </label>
            <label>
              Timeline
              <input placeholder="4 years" />
            </label>
            <label>
              Risk profile
              <input placeholder="Conservative" />
            </label>
            <button className="button button-primary" type="button">
              Start simulation
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="page">
      <PageIntro
        kicker="Pricing"
        title="Pricing that still makes sense on a student budget."
        copy="The free tier is useful. Paid plans only unlock modeling, collaboration, and automation layers that justify themselves."
      />
      <section className="pricing-grid">
        {pricingPlans.map((plan) => (
          <article key={plan.name} className="pricing-card">
            <span>{plan.name}</span>
            <h2>{plan.price}</h2>
            <p>{plan.note}</p>
            <ul>
              {plan.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="button button-primary">Choose plan</button>
          </article>
        ))}
      </section>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page">
      <PageIntro
        kicker="Settings"
        title="Keep the app tuned to your life, not the default."
        copy="Students do not all budget the same way. Preferences, categories, and connection states should be easy to adjust."
      />
      <section className="card-grid">
        {settingsSections.map((section) => (
          <article key={section.title} className="resource-card">
            <span>Preference</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            <button className="button button-ghost">Manage</button>
          </article>
        ))}
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

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.amount) {
      return;
    }

    setTransactions((current) => [
      {
        id: Date.now(),
        name: form.name,
        category: form.category,
        amount: Number(form.amount),
        time: "Just now",
      },
      ...current,
    ]);

    setForm({ name: "", category: "Food", amount: "" });
    setDrawerOpen(false);
  }

  return (
    <div className="app">
      <div className="backdrop">
        <div className="backdrop-gradient" />
        <div className="backdrop-lines" />
        <div className="backdrop-noise" />
      </div>

      <TopBar onOpenDrawer={() => setDrawerOpen(true)} />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
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

      <aside className={`drawer ${drawerOpen ? "drawer-open" : ""}`}>
        <div className="drawer-head">
          <div>
            <p className="eyebrow">Quick add</p>
            <h2>New transaction</h2>
          </div>
          <button className="button button-ghost" onClick={() => setDrawerOpen(false)}>
            Close
          </button>
        </div>

        <form className="stack" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Bookstore"
            />
          </label>
          <label>
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm((current) => ({ ...current, category: event.target.value }))
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
                setForm((current) => ({ ...current, amount: event.target.value }))
              }
              placeholder="-18.50"
            />
          </label>
          <button className="button button-primary" type="submit">
            Save transaction
          </button>
        </form>

        <p className="small-copy">Use negative values for expenses and positive values for income.</p>
      </aside>
    </div>
  );
}
