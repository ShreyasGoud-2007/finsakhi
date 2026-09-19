from finance_engine import (
    calculate_balance,
    calculate_savings_rate,
    calculate_category_breakdown,
    calculate_goal_progress,
    calculate_months_to_goal,
    calculate_finance_summary
)


print("========== FINANCE ENGINE TEST ==========")


# Test 1: Balance
income = 15000
expenses = 9000

balance = calculate_balance(
    income,
    expenses
)

print("\n1. Balance")
print("Income:", income)
print("Expenses:", expenses)
print("Balance:", balance)


# Test 2: Savings rate
savings_rate = calculate_savings_rate(
    income,
    expenses
)

print("\n2. Savings Rate")
print("Savings Rate:", savings_rate, "%")


# Test 3: Category breakdown
categories = {
    "food": 3500,
    "transport": 1200,
    "education": 2000,
    "healthcare": 500
}

breakdown = calculate_category_breakdown(
    categories
)

print("\n3. Category Breakdown")
print(breakdown)


# Test 4: Savings goal
goal_progress = calculate_goal_progress(
    target=20000,
    current=5000
)

print("\n4. Savings Goal")
print(goal_progress)


# Test 5: Months to goal
months = calculate_months_to_goal(
    target=20000,
    current=5000,
    monthly_contribution=2000
)

print("\n5. Months to Goal")
print("Months:", months)


# Test 6: Complete summary
summary = calculate_finance_summary(
    income=15000,
    expenses=9000,
    categories=categories,
    goal={
        "target": 20000,
        "current": 5000,
        "monthly_contribution": 2000
    }
)

print("\n6. Complete Financial Summary")
print(summary)