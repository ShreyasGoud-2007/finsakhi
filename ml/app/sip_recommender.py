# =========================================================
# FinSakhi SIP / Mutual Fund Category Recommender
# Educational category suggestions only
# =========================================================


SIP_CATEGORIES = {
    "low": [
        {
            "category": "Debt-oriented mutual funds",
            "reason": "These funds generally focus more on fixed-income securities and may suit investors looking for lower equity exposure."
        },
        {
            "category": "Conservative Hybrid Funds",
            "reason": "These funds combine debt and a smaller equity allocation."
        }
    ],

    "moderate": [
        {
            "category": "Broad-market Index Funds",
            "reason": "These funds aim to track a market index and provide diversified equity exposure."
        },
        {
            "category": "Aggressive Hybrid Funds",
            "reason": "These funds combine equity and debt, providing exposure to both asset classes."
        },
        {
            "category": "Flexi Cap Funds",
            "reason": "These funds can invest across companies of different market capitalisations."
        }
    ],

    "high": [
        {
            "category": "Broad-market Index Funds",
            "reason": "These provide diversified equity exposure through an index."
        },
        {
            "category": "Flexi Cap Funds",
            "reason": "These funds can invest across large, mid and small companies."
        },
        {
            "category": "Equity-oriented Mutual Funds",
            "reason": "These have higher equity exposure and therefore can experience larger market fluctuations."
        }
    ]
}


def normalize_risk(risk_level: str) -> str:
    """
    Normalize user-provided risk level.
    """

    risk = risk_level.strip().lower()

    if risk in ["low", "conservative"]:
        return "low"

    if risk in ["moderate", "medium", "balanced"]:
        return "moderate"

    if risk in ["high", "aggressive"]:
        return "high"

    raise ValueError(
        "Risk level must be Low, Moderate, or High."
    )


def recommend_sip_categories(
    risk_level: str,
    goal: str | None = None,
    years: int | None = None,
    top_k: int = 3
) -> dict:
    """
    Return educational mutual-fund categories based on risk level.

    This function does NOT recommend a specific mutual fund.
    """

    risk = normalize_risk(risk_level)

    if top_k <= 0:
        raise ValueError("top_k must be greater than 0.")

    recommendations = SIP_CATEGORIES[risk][:top_k]

    return {
        "risk_level": risk,
        "goal": goal,
        "years": years,
        "recommendations": recommendations,
        "educational_only": True,
        "note": (
            "These are educational category suggestions, not "
            "personalized investment advice or buy/sell recommendations."
        )
    }