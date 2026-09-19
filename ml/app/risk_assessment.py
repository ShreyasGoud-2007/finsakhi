# =========================================================
# FinSakhi Risk Assessment
# Educational risk-profile assessment only
# =========================================================


def calculate_risk_profile(
    investment_horizon: int,
    loss_reaction: str,
    liquidity_need: str,
    growth_preference: str
) -> dict:
    """
    Calculate a simple educational risk profile.

    This assesses risk comfort based on user responses.
    It is NOT personalized investment advice.
    """

    if investment_horizon <= 0:
        raise ValueError("Investment horizon must be greater than 0.")

    score = 0

    # -----------------------------------------------------
    # 1. Investment horizon
    # -----------------------------------------------------

    if investment_horizon < 3:
        score += 1
    elif investment_horizon <= 7:
        score += 2
    else:
        score += 3

    # -----------------------------------------------------
    # 2. Reaction to temporary loss
    # -----------------------------------------------------

    loss_reaction = loss_reaction.strip().lower()

    loss_scores = {
        "sell immediately": 1,
        "wait": 2,
        "stay invested": 3
    }

    if loss_reaction not in loss_scores:
        raise ValueError(
            "loss_reaction must be: "
            "sell immediately, wait, or stay invested."
        )

    score += loss_scores[loss_reaction]

    # -----------------------------------------------------
    # 3. Need for money / liquidity
    # -----------------------------------------------------

    liquidity_need = liquidity_need.strip().lower()

    liquidity_scores = {
        "need soon": 1,
        "may need": 2,
        "do not need soon": 3
    }

    if liquidity_need not in liquidity_scores:
        raise ValueError(
            "liquidity_need must be: "
            "need soon, may need, or do not need soon."
        )

    score += liquidity_scores[liquidity_need]

    # -----------------------------------------------------
    # 4. Growth preference
    # -----------------------------------------------------

    growth_preference = growth_preference.strip().lower()

    growth_scores = {
        "protect money": 1,
        "balanced": 2,
        "higher growth": 3
    }

    if growth_preference not in growth_scores:
        raise ValueError(
            "growth_preference must be: "
            "protect money, balanced, or higher growth."
        )

    score += growth_scores[growth_preference]

    # -----------------------------------------------------
    # Determine profile
    # -----------------------------------------------------

    if score <= 6:
        risk_profile = "LOW"

    elif score <= 9:
        risk_profile = "MODERATE"

    else:
        risk_profile = "HIGH"

    # -----------------------------------------------------
    # Explanation
    # -----------------------------------------------------

    explanations = {
        "LOW": (
            "Your answers indicate lower comfort with investment "
            "risk and greater preference for protecting money."
        ),
        "MODERATE": (
            "Your answers indicate a balance between protecting money "
            "and accepting some investment fluctuations."
        ),
        "HIGH": (
            "Your answers indicate greater comfort with investment "
            "fluctuations and a stronger preference for growth."
        )
    }

    return {
        "score": score,
        "risk_profile": risk_profile,
        "explanation": explanations[risk_profile],
        "educational_only": True,
        "note": (
            "This is an educational risk-profile assessment. "
            "It is not personalized investment advice and does not "
            "recommend buying or selling any investment."
        )
    }