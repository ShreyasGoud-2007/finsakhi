/**
 * HowItWorks — enhanced "How FinSakhi Works" section
 * Uses React Bits BranchedMenu + an explanation panel.
 * Keeps the original 3-step summary above, then adds
 * the interactive BranchedMenu below it.
 */
import { useState } from 'react';
import {
  Money01Icon,
  MoneyReceiveFlow01Icon,
  BarChartIcon,
  PiggyBankIcon,
  SavingsIcon,
  BanknoteIcon,
  BookOpen01Icon,
  TrendingUpIcon,
  TaskDoneIcon,
} from '@hugeicons/core-free-icons';
import BranchedMenu from './BranchedMenu.jsx';
import ScrollReveal from './ScrollReveal.jsx';

/* ── content map: value → explanation ── */
const EXPLANATIONS = {
  'track-income':   { title: 'Track Income', text: 'Record all the money that comes in — salary, freelance work, gifts — so you always know your starting point.' },
  'track-expenses': { title: 'Track Expenses', text: 'See where your money goes and understand your spending habits. Small expenses add up — tracking them helps you take control.' },
  'understand-spending': { title: 'Understand Spending', text: 'Visualise your spending across categories and spot patterns. Knowing your habits is the first step to changing them.' },
  'create-budget':  { title: 'Create a Budget', text: 'Set realistic limits for each spending category so your money goes where you intend it to, every month.' },
  'savings-goals':  { title: 'Set Savings Goals', text: 'Create goals for emergencies, education, family needs and other priorities. Break big goals into small, achievable steps.' },
  'plan-monthly':   { title: 'Plan Monthly Expenses', text: 'Map out expected expenses before the month begins so you\'re never caught off guard by bills or spending spikes.' },
  'learn-basics':   { title: 'Learn Financial Basics', text: 'Understand budgeting, saving, investing and financial safety in simple language — no jargon, no confusion.' },
  'saving-habits':  { title: 'Build Saving Habits', text: 'Small, consistent savings add up to big results. FinSakhi helps you build the habit one step at a time.' },
  'informed-decisions': { title: 'Make Informed Decisions', text: 'With clear data and financial knowledge, you can evaluate options and choose what\'s right for your life and goals.' },
};

/* ── BranchedMenu item definitions ── */
const MENU_ITEMS = [
  {
    label: 'Track',
    children: [
      { value: 'track-income',        label: 'Track income',        icon: Money01Icon },
      { value: 'track-expenses',      label: 'Track expenses',      icon: MoneyReceiveFlow01Icon },
      { value: 'understand-spending', label: 'Understand spending', icon: BarChartIcon },
    ],
  },
  {
    label: 'Plan',
    children: [
      { value: 'create-budget',  label: 'Create a budget',         icon: BanknoteIcon },
      { value: 'savings-goals',  label: 'Set savings goals',       icon: PiggyBankIcon },
      { value: 'plan-monthly',   label: 'Plan monthly expenses',   icon: SavingsIcon },
    ],
  },
  {
    label: 'Grow',
    children: [
      { value: 'learn-basics',        label: 'Learn financial basics',    icon: BookOpen01Icon },
      { value: 'saving-habits',       label: 'Build saving habits',       icon: TrendingUpIcon },
      { value: 'informed-decisions',  label: 'Make informed decisions',   icon: TaskDoneIcon },
    ],
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState('track-income');
  const info = EXPLANATIONS[active] ?? EXPLANATIONS['track-income'];

  return (
    <section className="how-section" id="learn">
      <div className="section-header">
        <h2>Start your financial journey in 3 simple steps</h2>
      </div>

      {/* ── original 3-step summary ── */}
      <div className="steps-row">
        {[
          { num: '01', title: 'Track', body: 'Know where your money comes from and where it goes.' },
          { num: '02', title: 'Plan',  body: 'Create budgets and savings goals that work for you.' },
          { num: '03', title: 'Grow',  body: 'Learn, save and make informed financial decisions.' },
        ].map(({ num, title, body }, i) => (
          <ScrollReveal key={num} delay={i * 120} threshold={0.2}>
            <div className="step-item">
              <div className="step-num">{num}</div>
              <div className="step-connector" style={{ display: i < 2 ? 'block' : 'none' }} />
              <div className="step-content">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ── BranchedMenu interactive explorer ── */}
      <ScrollReveal delay={60} threshold={0.15}>
        <div className="how-explorer">
          <div className="how-explorer__menu">
            <p className="how-explorer__eyebrow">Explore in detail</p>
            <BranchedMenu
              items={MENU_ITEMS}
              defaultOpen={0}
              defaultActive="track-income"
              onSelect={val => setActive(val)}
              /* FinSakhi palette */
              color="#173B36"
              accentColor="#0F766E"
              lineColor="#D5E5DF"
              width={320}
              rowHeight={44}
              indent={52}
              trunk={18}
              radius={12}
              lineWidth={1.5}
              fontSize={15}
              drawDuration={400}
              foldDuration={300}
            />
          </div>

          <div className="how-explorer__panel" aria-live="polite" aria-atomic="true">
            <div className="how-explorer__panel-inner" key={active}>
              <p className="how-explorer__panel-label">
                {MENU_ITEMS.find(s => s.children.some(c => c.value === active))?.label ?? ''}
              </p>
              <h3 className="how-explorer__panel-title">{info.title}</h3>
              <p className="how-explorer__panel-text">{info.text}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
