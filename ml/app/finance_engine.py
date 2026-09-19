import math


def calculate_balance(income: float, expenses: float) -> float:
    """
    Calculate remaining money after expenses.
    """
    return round(income - expenses, 2)


def calculate_savings_rate(income: float, expenses: float) -> float:
    """
    Calculate savings rate as a percentage.
    """
    if income <= 0:
        return 0.0

    savings = income - expenses
    savings_rate = (savings / income) * 100

    return round(savings_rate, 2)


def calculate_category_breakdown(categories: dict) -> dict:
    """
    Calculate total spending across categories.
    """
    cleaned_categories = {}

    for category, amount in categories.items():
        try:
            cleaned_categories[category] = round(float(amount), 2)
        except (ValueError, TypeError):
            cleaned_categories[category] = 0.0

    total = round(sum(cleaned_categories.values()), 2)

    return {
        "categories": cleaned_categories,
        "total": total
    }


def calculate_goal_progress(
    target: float,
    current: float
) -> dict:
    """
    Calculate savings goal progress.
    """

    target = float(target)
    current = float(current)

    if target <= 0:
        return {
            "target": target,
            "current": current,
            "remaining": 0.0,
            "progress_percent": 0.0
        }

    remaining = max(target - current, 0)

    progress_percent = min(
        (current / target) * 100,
        100
    )

    return {
        "target": round(target, 2),
        "current": round(current, 2),
        "remaining": round(remaining, 2),
        "progress_percent": round(progress_percent, 2)
    }


def calculate_months_to_goal(
    target: float,
    current: float,
    monthly_contribution: float
):
    """
    Estimate how many months are needed to reach a savings goal.
    """

    target = float(target)
    current = float(current)
    monthly_contribution = float(monthly_contribution)

    remaining = max(target - current, 0)

    if remaining == 0:
        return 0

    if monthly_contribution <= 0:
        return None

    months = math.ceil(
        remaining / monthly_contribution
    )

    return months


def calculate_finance_summary(
    income: float,
    expenses: float,
    categories: dict | None = None,
    goal: dict | None = None
) -> dict:
    """
    Generate a complete financial summary.
    """

    income = float(income)
    expenses = float(expenses)

    balance = calculate_balance(
        income,
        expenses
    )

    savings_rate = calculate_savings_rate(
        income,
        expenses
    )

    result = {
        "income": round(income, 2),
        "expenses": round(expenses, 2),
        "balance": balance,
        "savings_rate": savings_rate
    }

    if categories is not None:
        result["category_breakdown"] = (
            calculate_category_breakdown(categories)
        )

    if goal is not None:
        target = goal.get("target", 0)
        current = goal.get("current", 0)
        monthly_contribution = goal.get(
            "monthly_contribution",
            0
        )

        result["goal"] = calculate_goal_progress(
            target,
            current
        )

        result["months_to_goal"] = (
            calculate_months_to_goal(
                target,
                current,
                monthly_contribution
            )
        )

    return result