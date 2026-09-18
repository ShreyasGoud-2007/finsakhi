import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import SpotlightCard  from './components/SpotlightCard.jsx'
import ScrollReveal   from './components/ScrollReveal.jsx'
import CountUp        from './components/CountUp.jsx'
import HowItWorks     from './components/HowItWorks.jsx'
import StrokeText     from './components/StrokeText.jsx'
import CursorGrid     from './components/CursorGrid.jsx'
import CardSwap, { Card } from './components/CardSwap.jsx'
import { StaggeredMenu }  from './components/StaggeredMenu.jsx'
import './App.css'

/* ─────────────────────────────────────────
   MagnetBtn — subtle cursor-pull on hover
───────────────────────────────────────── */
const MAGNET_STRENGTH = 0.3
const MAGNET_CAP      = 12

function MagnetBtn({ children, className, onClick, ...rest }) {
  const ref  = useRef(null)
  const mx   = useMotionValue(0)
  const my   = useMotionValue(0)
  const tx   = useSpring(mx, { damping: 20, stiffness: 260, mass: 0.6 })
  const ty   = useSpring(my, { damping: 20, stiffness: 260, mass: 0.6 })

  const reduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = useCallback(e => {
    if (reduced) return
    const rect = ref.current.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    mx.set(Math.max(-MAGNET_CAP, Math.min(MAGNET_CAP, (e.clientX - cx) * MAGNET_STRENGTH)))
    my.set(Math.max(-MAGNET_CAP, Math.min(MAGNET_CAP, (e.clientY - cy) * MAGNET_STRENGTH)))
  }, [mx, my, reduced])

  const onLeave = useCallback(() => { mx.set(0); my.set(0) }, [mx, my])

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x: tx, y: ty }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

/* ─────────────────────────────────────────
   Inline SVG icons
───────────────────────────────────────── */
const Icon = ({ name }) => {
  const icons = {
    track: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    goal: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    learn: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 10h.01M12 10h.01M16 10h.01"/>
      </svg>
    ),
    logo: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#1a7a5e"/>
        <path d="M10 20 Q16 10 22 20" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M13 17 Q16 12 19 17" stroke="#a8d8c8" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="16" cy="22" r="2" fill="#fff"/>
      </svg>
    ),
  }
  return <span className="icon-wrap">{icons[name]}</span>
}

/* ─────────────────────────────────────────
   CardSwap hero visual — 3 FinSakhi cards
───────────────────────────────────────── */
function HeroCardSwap() {
  return (
    <div className="hero-cardswap-wrap" aria-hidden="true">
      <CardSwap
        width={340}
        height={220}
        cardDistance={35}
        verticalDistance={45}
        delay={2000}
        pauseOnHover={true}
        skewAmount={3}
        easing="elastic"
      >
        {/* Card 1 — Track */}
        <Card className="fs-card fs-card--track">
          <div className="fsc-header">
            <span className="fsc-icon">📊</span>
            <div>
              <p className="fsc-title">Track Your Money</p>
              <p className="fsc-sub">Know where your money goes.</p>
            </div>
          </div>
          <div className="fsc-stats">
            <div className="fsc-stat">
              <span className="fsc-label">Income</span>
              <span className="fsc-val fsc-income">₹ 35,000</span>
            </div>
            <div className="fsc-stat">
              <span className="fsc-label">Expenses</span>
              <span className="fsc-val fsc-expense">₹ 10,300</span>
            </div>
            <div className="fsc-stat">
              <span className="fsc-label">Money left</span>
              <span className="fsc-val fsc-saved">₹ 24,700</span>
            </div>
          </div>
        </Card>

        {/* Card 2 — Save */}
        <Card className="fs-card fs-card--save">
          <div className="fsc-header">
            <span className="fsc-icon">🎯</span>
            <div>
              <p className="fsc-title">Build Your Savings</p>
              <p className="fsc-sub">Turn small savings into meaningful goals.</p>
            </div>
          </div>
          <div className="fsc-goal-row">
            <p className="fsc-goal-name">Emergency Fund</p>
            <p className="fsc-goal-amount">₹ 5,000 / ₹ 20,000</p>
          </div>
          <div className="fsc-progress-bar">
            <div className="fsc-progress-fill" style={{ width: '25%' }} />
          </div>
          <p className="fsc-progress-label">25% achieved</p>
        </Card>

        {/* Card 3 — Learn */}
        <Card className="fs-card fs-card--learn">
          <div className="fsc-header">
            <span className="fsc-icon">📚</span>
            <div>
              <p className="fsc-title">Learn &amp; Grow</p>
              <p className="fsc-sub">Understand money in simple language.</p>
            </div>
          </div>
          <div className="fsc-tags">
            <span className="fsc-tag">Budgeting</span>
            <span className="fsc-tag">Saving</span>
            <span className="fsc-tag">Investments</span>
          </div>
        </Card>
      </CardSwap>
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════ */
export default function App() {
  const handleGetStarted = () => {
    /* future: navigate to /dashboard or /login */
    alert('Dashboard coming soon!')
  }

  /* StaggeredMenu items — reuse handleGetStarted for Get Started */
  const mobileNavItems = [
    { label: 'Home',         link: '#home' },
    { label: 'Features',     link: '#features' },
    { label: 'How It Works', link: '#learn' },
    { label: 'Learn',        link: '#about' },
    { label: 'About',        link: '#about' },
    { label: 'Get Started',  onClick: handleGetStarted, ariaLabel: 'Get started with FinSakhi' },
  ]

  return (
    <div className="fs-root">

      {/* ── 1. NAVBAR ── */}
      <header className="navbar">
        <div className="navbar-inner">

          {/* Brand */}
          <div className="nav-brand">
            <Icon name="logo" />
            <div className="brand-text">
              <span className="brand-name">FinSakhi</span>
              <span className="brand-tagline">Your money, made simple</span>
            </div>
          </div>

          {/* Desktop nav links */}
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#learn">How It Works</a>
            <a href="#about">About</a>
          </nav>

          {/* Desktop right actions */}
          <div className="nav-actions">
            <button className="btn-ghost">Log in</button>
            <MagnetBtn className="btn-primary" onClick={handleGetStarted}>Get Started</MagnetBtn>
          </div>

          {/* Mobile StaggeredMenu — visible only on mobile via CSS */}
          <div className="mobile-staggered-wrapper">
            <StaggeredMenu
              items={mobileNavItems}
              colors={['#FAF9F5', '#EAF5F1']}
              position="right"
              displaySocials={false}
              displayItemNumbering={false}
              menuButtonColor="#173B36"
              openMenuButtonColor="#173B36"
              changeMenuColorOnOpen={false}
              accentColor="#0F766E"
              closeOnClickAway={true}
              isFixed={true}
            />
          </div>

        </div>
      </header>

      {/* ── 2. HERO ── */}
      <main>
        <div className="hero-band">
        <section className="hero-section" id="home">

          {/* CursorGrid background — extremely subtle, cream hero stays cream */}
          <div className="hero-cursor-grid" aria-hidden="true">
            <CursorGrid
              cellSize={80}
              color="#0F766E"
              radius={120}
              falloff="smooth"
              holdTime={300}
              fadeDuration={700}
              lineWidth={1}
              maxOpacity={0.12}
              fillOpacity={0.015}
              gridOpacity={0.025}
              cellRadius={10}
              clickPulse={false}
            />
          </div>

          {/* Left — content */}
          <div className="hero-content">
            <p className="hero-eyebrow">Personal Finance · Made for You</p>

            <h1 className="hero-headline hero-headline--stroke" aria-label="Your money. Your future.">
              <StrokeText
                text="Your money. Your future."
                strokeColor="#0F766E"
                fillColor="#173B36"
                strokeWidth={1.2}
                drawDuration={1.4}
                fillDelay={0.15}
                stagger={0.035}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                fontSize={56}
                fontWeight={800}
                letterSpacing={-2}
              />
            </h1>

            <p className="hero-body">
              FinSakhi makes managing money simple. Track your income and expenses,
              set savings goals, learn financial basics, and make more confident
              financial decisions.
            </p>

            <div className="hero-btns">
              <MagnetBtn className="btn-primary btn-lg" onClick={handleGetStarted}>Get Started</MagnetBtn>
              <a href="#features" className="btn-outline btn-lg">Explore Features</a>
            </div>

            <div className="hero-social-proof">
              <div className="avatar-stack">
                {['#f4a261','#2a9d8f','#e9c46a','#264653'].map((c, i) => (
                  <div key={i} className="avatar-mini" style={{ background: c }} />
                ))}
              </div>
              <p>Trusted by thousands of women managing their finances</p>
            </div>
          </div>

          {/* Right — CardSwap financial visual */}
          <HeroCardSwap />

        </section>
        </div>

        {/* ── 3. TRUST / INTRO ── */}
        <section className="intro-section" id="about">
          <div className="intro-inner">
            <div className="intro-badge">Why FinSakhi</div>
            <h2>Money management doesn't have to be complicated.</h2>
            <p>
              FinSakhi is designed to make financial management understandable and
              accessible — especially for people who are new to managing their own
              finances. Whether you're tracking your first salary or saving for a
              big goal, FinSakhi speaks your language and guides you every step of
              the way.
            </p>

            {/* CountUp stats — wrapped in SpotlightCards */}
            <div className="stats-spotlight-row">
              <SpotlightCard
                className="stat-spotlight-card"
                spotlightColor="rgba(15, 118, 110, 0.22)"
              >
                <strong aria-label="Free to get started">
                  ₹<CountUp to={0} from={0} duration={1} />
                </strong>
                <span>to get started</span>
              </SpotlightCard>

              <SpotlightCard
                className="stat-spotlight-card"
                spotlightColor="rgba(15, 118, 110, 0.22)"
              >
                <strong>
                  <CountUp to={4} from={0} duration={1.5} suffix=" tools" />
                </strong>
                <span>in one place</span>
              </SpotlightCard>

              <SpotlightCard
                className="stat-spotlight-card"
                spotlightColor="rgba(15, 118, 110, 0.22)"
              >
                <strong>
                  <CountUp to={100} from={0} duration={1.8} suffix="%" />
                </strong>
                <span>your data, your control</span>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* ── 4. FEATURES ── */}
        <section className="features-section" id="features">
          <div className="section-header">
            <h2>Everything you need to manage your money</h2>
            <p>Four powerful tools, one friendly app.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: 'track', title: 'Track Your Money',       body: 'Understand where your income goes and keep track of everyday expenses.' },
              { icon: 'goal',  title: 'Set Savings Goals',      body: 'Create meaningful goals and see your progress over time.' },
              { icon: 'learn', title: 'Learn Financial Basics', body: 'Learn budgeting, saving, investing, loans and digital financial safety in simple language.' },
              { icon: 'ai',    title: 'Ask AI',                 body: 'Get simple, personalised explanations and financial guidance from your AI assistant.' },
            ].map(({ icon, title, body }) => (
              <SpotlightCard key={title} spotlightColor="rgba(26,122,94,0.10)">
                <div className="feature-card-inner">
                  <div className="feature-icon-wrap"><Icon name={icon} /></div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* ── 5. HOW IT WORKS ── */}
        <HowItWorks />

        {/* ── 6. FINANCIAL EMPOWERMENT ── */}
        <section className="empower-section">
          <div className="empower-inner">
            <div className="empower-text">
              <h2>Your money. Your decisions. Your future.</h2>
              <p>
                FinSakhi gives you the tools and knowledge to understand your
                finances and make decisions with confidence.
              </p>
              <MagnetBtn className="btn-primary btn-lg" onClick={handleGetStarted}>
                Get Started
              </MagnetBtn>
            </div>
            <ScrollReveal delay={80} threshold={0.2}>
              <div className="empower-visual" aria-hidden="true">
                <div className="empower-card">
                  <p className="empower-card-label">This month</p>
                  <p className="empower-card-amount">₹ 8,200 saved</p>
                  <div className="empower-bar"><div className="empower-bar-fill" /></div>
                  <p className="empower-card-sub">68% of your ₹12,000 goal</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>

      {/* ── 8. FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <Icon name="logo" />
              <span className="footer-brand-name">FinSakhi</span>
            </div>
            <p>Your money, made simple</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#learn">Learn</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FinSakhi. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
