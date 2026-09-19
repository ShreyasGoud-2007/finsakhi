# =========================================================
# FinSakhi Investment Engine
# Deterministic SIP and Goal Calculations
# =========================================================


def calculate_sip(
    monthly_investment: float,
    annual_return: float,
    years: int
) -> dict:
    """
    Calculate an illustrative SIP future value.

    The calculation assumes:
    - fixed monthly investment
    - constant illustrative annual return
    - monthly compounding

    Returns educational estimates only.
    """

    if monthly_investment <= 0:
        raise ValueError("Monthly investment must be greater than 0.")

    if annual_return < 0:
        raise ValueError("Annual return cannot be negative.")

    if years <= 0:
        raise ValueError("Investment duration must be greater than 0.")

    months = years * 12

    monthly_rate = annual_return / 100 / 12

    total_invested = monthly_investment * months

    # SIP future value formula
    if monthly_rate == 0:
        future_value = total_invested
    else:
        future_value = (
            monthly_investment
            * (((1 + monthly_rate) ** months - 1) / monthly_rate)
            * (1 + monthly_rate)
        )

    estimated_returns = future_value - total_invested

    return {
        "monthly_investment": round(monthly_investment, 2),
        "annual_return_assumption": round(annual_return, 2),
        "years": years,
        "months": months,
        "total_invested": round(total_invested, 2),
        "estimated_returns": round(estimated_returns, 2),
        "estimated_final_value": round(future_value, 2),
        "illustrative_only": True
    }


def calculate_goal_sip(
    goal_amount: float,
    current_savings: float,
    years: int,
    annual_return: float = 10.0
) -> dict:
    """
    Estimate the monthly SIP required to reach a financial goal.

    The return assumption is illustrative and not guaranteed.
    """

    if goal_amount <= 0:
        raise ValueError("Goal amount must be greater than 0.")

    if current_savings < 0:
        raise ValueError("Current savings cannot be negative.")

    if years <= 0:
        raise ValueError("Goal duration must be greater than 0.")

    if annual_return < 0:
        raise ValueError("Annual return cannot be negative.")

    remaining_goal = max(goal_amount - current_savings, 0)

    months = years * 12
    monthly_rate = annual_return / 100 / 12

    if remaining_goal == 0:
        required_monthly_sip = 0

    elif monthly_rate == 0:
        required_monthly_sip = remaining_goal / months

    else:
        required_monthly_sip = (
            remaining_goal
            * monthly_rate
            / (
                ((1 + monthly_rate) ** months - 1)
                * (1 + monthly_rate)
            )
        )

    return {
        "goal_amount": round(goal_amount, 2),
        "current_savings": round(current_savings, 2),
        "remaining_goal": round(remaining_goal, 2),
        "years": years,
        "months": months,
        "annual_return_assumption": round(annual_return, 2),
        "required_monthly_sip": round(required_monthly_sip, 2),
        "illustrative_only": True
    }