import type { FinancialLesson, LessonCategory } from "./types";

export const LESSON_CATEGORIES: {
  id: LessonCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All topics" },
  { id: "basics", label: "Basics" },
  { id: "saving", label: "Saving" },
  { id: "borrowing", label: "Borrowing" },
  { id: "investing", label: "Investing" },
  { id: "protection", label: "Protection" },
];

export const LESSONS: FinancialLesson[] = [
  {
    id: "savings-account",
    title: "What is a Savings Account?",
    summary:
      "A safe place in a bank to keep money you do not need today.",
    category: "basics",
    icon: "PiggyBank",
    explanation:
      "A savings account is an account you open at a bank or post office. You keep your money there instead of at home. You can put money in and take money out whenever you need it. The bank also adds a small amount of extra money, called interest, for keeping your money with them.",
    example:
      "Kavitha sells vegetables. Every evening she keeps ₹50 aside. At the end of the month she puts ₹1,500 into her savings account. The money is safe, and she can withdraw it any day she needs it.",
    whyItMatters:
      "Money kept at home can be lost, stolen or spent without thinking. Money in a bank is counted, recorded and available when you need it. A bank account is also needed to receive government payments directly.",
    remember: [
      "Opening a basic savings account under Jan Dhan needs no minimum balance.",
      "Ask the bank for a passbook so you can see every entry.",
      "Never share your PIN or OTP with anyone, including bank staff.",
    ],
  },
  {
    id: "interest",
    title: "What is Interest?",
    summary:
      "Extra money you earn on savings, or extra money you pay on a loan.",
    category: "basics",
    icon: "Percent",
    explanation:
      "Interest works in two directions. When you keep money in a bank, the bank pays you interest. When you borrow money, you pay interest to the lender. It is usually written as a percentage for one year.",
    example:
      "If you keep ₹10,000 in a savings account at 4% per year, after one year the bank adds about ₹400. If you borrow ₹10,000 at 24% per year, you pay about ₹2,400 extra over the year.",
    whyItMatters:
      "The same word can help you or cost you. Understanding the rate before borrowing is the difference between a loan you can repay and one that grows faster than your income.",
    remember: [
      "Always ask for the yearly rate, not the monthly one.",
      "A moneylender charging 5% per month is charging 60% per year.",
      "Interest on savings is small but it is free money.",
    ],
  },
  {
    id: "budget",
    title: "What is a Budget?",
    summary:
      "A simple plan for what your money will do this month.",
    category: "basics",
    icon: "ClipboardList",
    explanation:
      "A budget is deciding, before the month starts, how much of your income goes to food, travel, school, medicines and savings. It is not about spending less on everything. It is about knowing where your money is going.",
    example:
      "Income ₹15,000. Plan: ₹4,000 food, ₹1,500 travel, ₹2,000 school, ₹1,000 household, ₹500 medicines, ₹2,000 savings. That leaves ₹4,000 for anything unexpected.",
    whyItMatters:
      "Without a plan, money disappears in small amounts and there is nothing left at month end. With a plan, saving happens first instead of last.",
    remember: [
      "Write the plan at the start of the month, not the end.",
      "Keep savings as a fixed item, like rent.",
      "A budget that is never followed is still better than no budget - adjust it.",
    ],
  },
  {
    id: "emergency-fund",
    title: "What is an Emergency Fund?",
    summary:
      "Money kept aside only for sudden, unexpected needs.",
    category: "saving",
    icon: "ShieldCheck",
    explanation:
      "An emergency fund is money kept aside for unexpected expenses such as medical needs, house or vehicle repairs, or a month when income does not come. It is not for festivals, weddings or shopping - those can be planned in advance.",
    example:
      "If your essential monthly expenses are ₹8,000, you can gradually build an emergency fund by saving a small amount regularly. Saving ₹2,000 a month reaches ₹20,000 in ten months - enough to cover more than two months of essentials.",
    whyItMatters:
      "An emergency fund is what stops a small problem from becoming a big debt. Without it, a hospital bill turns into a high-interest loan that takes years to repay.",
    remember: [
      "Aim for three months of essential expenses, built slowly.",
      "Keep it separate from your daily-use money so it is not spent by habit.",
      "Refill it after you use it.",
    ],
  },
  {
    id: "loan",
    title: "What is a Loan?",
    summary:
      "Money you borrow now and repay later, with interest.",
    category: "borrowing",
    icon: "Landmark",
    explanation:
      "A loan is money given to you by a bank, a self-help group or a lender, which you repay in instalments over an agreed time. Along with the borrowed amount, you pay interest. A loan is useful when it helps you earn more - like buying a sewing machine - and risky when it is used for daily spending.",
    example:
      "Sunita borrows ₹20,000 from her SHG to buy a sewing machine. She repays ₹2,000 every month for 11 months. The machine earns her ₹3,000 a month, so the loan pays for itself.",
    whyItMatters:
      "The wrong loan can take more from your family than it gives. Knowing the rate, the instalment and the total repayment before signing protects you.",
    remember: [
      "Ask three questions: how much per month, for how many months, total repayment?",
      "Bank and SHG loans usually cost far less than a private moneylender.",
      "Never sign a paper you have not had read aloud to you.",
    ],
  },
  {
    id: "insurance",
    title: "What is Insurance?",
    summary:
      "A small regular payment that protects you from a big loss.",
    category: "protection",
    icon: "Umbrella",
    explanation:
      "With insurance, you pay a small amount regularly, called a premium. If something bad happens - an accident, illness, or the death of an earning member - the insurance company pays a large amount to you or your family.",
    example:
      "Under PMJJBY, a premium of around ₹436 a year gives the family ₹2 lakh if the insured person dies. Under PMSBY, about ₹20 a year covers accidental death and disability.",
    whyItMatters:
      "Insurance does not prevent trouble. It prevents trouble from destroying your savings and pushing your family into debt.",
    remember: [
      "Insurance is protection, not an investment - do not expect returns.",
      "Tell your family which policies exist and where the papers are kept.",
      "Government schemes are available through your bank account.",
    ],
  },
  {
    id: "fixed-deposit",
    title: "What is a Fixed Deposit?",
    summary:
      "Money locked in a bank for a fixed time at a fixed interest rate.",
    category: "saving",
    icon: "Lock",
    explanation:
      "In a fixed deposit, you give the bank an amount for a chosen period - six months, one year, five years. The bank pays a higher interest rate than a savings account because you agree not to withdraw it. You can still break it early, but you earn a little less.",
    example:
      "Put ₹10,000 in a one-year fixed deposit at about 7%. At the end of the year you get back roughly ₹10,700.",
    whyItMatters:
      "Money that is slightly harder to reach is money you are less likely to spend. It is one of the simplest ways to make savings grow safely.",
    remember: [
      "A recurring deposit works the same way but with a small amount each month.",
      "Bank deposits are insured up to ₹5 lakh per bank.",
      "Do not put your emergency fund in a long deposit.",
    ],
  },
  {
    id: "mutual-fund",
    title: "What is a Mutual Fund?",
    summary:
      "Many people's money invested together by a trained manager.",
    category: "investing",
    icon: "TrendingUp",
    explanation:
      "A mutual fund collects small amounts from many people and invests the total in company shares or government bonds. A professional manages it. The value can go up or down, so it suits money you will not need for several years.",
    example:
      "Ten women each invest ₹500 a month. The fund invests the ₹5,000 together. Over years the value may grow more than a bank deposit - but in a bad year it may also fall.",
    whyItMatters:
      "Over long periods, investments have generally grown faster than inflation. But the value is not guaranteed, so this is for long-term money only.",
    remember: [
      "Returns are never guaranteed. Anyone promising fixed high returns is not being honest.",
      "Start only after your emergency fund exists.",
      "Invest only through SEBI-registered platforms or your bank.",
    ],
  },
  {
    id: "inflation",
    title: "What is Inflation?",
    summary:
      "The same money buys less than it did before.",
    category: "basics",
    icon: "Flame",
    explanation:
      "Inflation means prices rise over time. A kilo of rice that cost ₹40 five years ago may cost ₹55 today. Your money has not changed, but what it can buy has shrunk.",
    example:
      "₹10,000 kept in a box at home for ten years is still ₹10,000 - but it may buy only half as much rice, oil and vegetables as it does today.",
    whyItMatters:
      "Money kept idle quietly loses value. This is why savings should at least earn some interest.",
    remember: [
      "Cash at home loses value every year.",
      "Compare interest earned against rising prices.",
      "This is the main reason long-term savings should not sit in a box.",
    ],
  },
  {
    id: "diversification",
    title: "What is Diversification?",
    summary:
      "Do not keep all your money in one place.",
    category: "investing",
    icon: "Layers",
    explanation:
      "Diversification means spreading your money across different places - some in a savings account, some in a deposit, some in gold, some in an investment. If one loses value, the others protect you.",
    example:
      "Instead of putting all ₹50,000 into one chit fund, keep ₹15,000 in the bank, ₹20,000 in a fixed deposit and ₹15,000 in a long-term investment.",
    whyItMatters:
      "Every family has heard of someone who lost everything in one scheme. Spreading money is the simplest protection there is.",
    remember: [
      "Never put all savings into one scheme, however trusted the person is.",
      "Keep some money easy to reach at all times.",
      "If a scheme promises to double money quickly, walk away.",
    ],
  },
  {
    id: "digital-banking-safety",
    title: "How to Stay Safe with Digital Payments?",
    summary:
      "Simple habits to protect your money when using UPI and digital banking.",
    category: "protection",
    icon: "Smartphone",
    explanation:
      "Digital payments are convenient, but you should always check who you are paying before approving a payment. Your UPI PIN is used to send money, not to receive it. Never share your UPI PIN, ATM PIN, password or OTP with anyone.",
    example:
      "Meena receives a message saying she has won ₹5,000 and must scan a QR code to receive the money. She does not scan it because scanning a payment QR code and entering a UPI PIN can send money from her account.",
    whyItMatters:
      "A payment made using your PIN can be difficult to reverse. Taking a few seconds to check the name, amount and payment request can protect your savings.",
    remember: [
      "Never share your UPI PIN, ATM PIN, password or OTP.",
      "A UPI PIN is used to send money, not to receive money.",
      "Check the recipient name and amount before approving a payment.",
      "Do not trust unknown links, QR codes or phone numbers claiming to be customer support.",
    ],
  },
];

export function getLesson(id: string): FinancialLesson | undefined {
  return LESSONS.find((l) => l.id === id);
}