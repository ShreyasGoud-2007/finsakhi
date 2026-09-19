from investment_engine import calculate_sip, calculate_goal_sip


print("\n========== INVESTMENT ENGINE TEST ==========\n")


print("1. SIP CALCULATOR")

sip = calculate_sip(
    monthly_investment=2000,
    annual_return=10,
    years=5
)

print(sip)


print("\n2. GOAL-BASED SIP")

goal = calculate_goal_sip(
    goal_amount=50000,
    current_savings=10000,
    years=3,
    annual_return=10
)

print(goal)


print("\n========== TEST COMPLETE ==========\n")