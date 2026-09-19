from fastapi import FastAPI
from pydantic import BaseModel

from .finance_engine import calculate_finance_summary
from .ml_model import predict_category
from .ai_service import generate_response
from .scheme_recommender import recommend_schemes
from .investment_engine import calculate_sip, calculate_goal_sip
from .sip_recommender import recommend_sip_categories
from .risk_assessment import calculate_risk_profile


app = FastAPI(
    title="FinSakhi AI Service",
    description="AI/ML service for FinSakhi",
    version="1.0.0"
)


# =========================================================
# REQUEST MODELS
# =========================================================

class TransactionRequest(BaseModel):
    description: str


class FinanceRequest(BaseModel):
    income: float
    expenses: float
    categories: dict | None = None
    goal: dict | None = None


class ChatRequest(BaseModel):
    message: str
    language: str = "en"
    financial_context: dict | None = None


class SchemeRequest(BaseModel):
    query: str
    top_k: int = 5


class SchemeAIRequest(BaseModel):
    query: str
    language: str = "en"
    top_k: int = 5


class SIPRequest(BaseModel):
    monthly_investment: float
    annual_return: float
    years: int


class GoalSIPRequest(BaseModel):
    goal_amount: float
    current_savings: float
    years: int
    annual_return: float = 10.0


class SIPRecommendationRequest(BaseModel):
    risk_level: str
    goal: str | None = None
    years: int | None = None
    top_k: int = 3


class RiskAssessmentRequest(BaseModel):
    investment_horizon: int
    loss_reaction: str
    liquidity_need: str
    growth_preference: str
    language: str = "en"


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "FinSakhi AI"
    }


# =========================================================
# TRANSACTION CLASSIFICATION
# =========================================================

@app.post("/predict-category")
def predict_transaction(request: TransactionRequest):

    result = predict_category(request.description)

    return {
        "description": request.description,
        "category": result["category"],
        "confidence": result["confidence"],
        "status": result["status"]
    }


# =========================================================
# FINANCE CALCULATION
# =========================================================

@app.post("/calculate-finance")
def calculate_finance(request: FinanceRequest):

    result = calculate_finance_summary(
        income=request.income,
        expenses=request.expenses,
        categories=request.categories,
        goal=request.goal
    )

    return result


# =========================================================
# AI CHAT
# =========================================================

@app.post("/chat")
def chat(request: ChatRequest):

    response = generate_response(
        message=request.message,
        language=request.language,
        financial_context=request.financial_context
    )

    return {
        "response": response,
        "language": request.language
    }


# =========================================================
# SIP CALCULATOR
# =========================================================

@app.post("/calculate-sip")
def calculate_sip_endpoint(request: SIPRequest):

    result = calculate_sip(
        monthly_investment=request.monthly_investment,
        annual_return=request.annual_return,
        years=request.years
    )

    return result


# =========================================================
# GOAL-BASED SIP
# =========================================================

@app.post("/calculate-goal-sip")
def calculate_goal_sip_endpoint(request: GoalSIPRequest):

    result = calculate_goal_sip(
        goal_amount=request.goal_amount,
        current_savings=request.current_savings,
        years=request.years,
        annual_return=request.annual_return
    )

    return result


# =========================================================
# SIP CATEGORY RECOMMENDATION
# =========================================================

@app.post("/recommend-sip-categories")
def recommend_sip_categories_endpoint(
    request: SIPRecommendationRequest
):

    result = recommend_sip_categories(
        risk_level=request.risk_level,
        goal=request.goal,
        years=request.years,
        top_k=request.top_k
    )

    return result


# =========================================================
# RISK ASSESSMENT
# =========================================================

@app.post("/risk-assessment")
def risk_assessment(request: RiskAssessmentRequest):

    result = calculate_risk_profile(
        investment_horizon=request.investment_horizon,
        loss_reaction=request.loss_reaction,
        liquidity_need=request.liquidity_need,
        growth_preference=request.growth_preference
    )

    return {
        "language": request.language,
        **result
    }


# =========================================================
# GOVERNMENT SCHEME RECOMMENDATION
# =========================================================

@app.post("/recommend-schemes")
def recommend_scheme_list(request: SchemeRequest):

    schemes = recommend_schemes(
        query=request.query,
        top_k=request.top_k
    )

    clean_schemes = []

    for scheme in schemes:
        clean_schemes.append({
            "name": scheme["name"],
            "short_name": scheme["short_name"],
            "government": scheme["government"],
            "category": scheme["category"],
            "target": scheme["target"],
            "purpose": scheme["purpose"],
            "benefit": scheme["benefit"],
            "important_note": scheme["important_note"],
            "source": scheme["source"]
        })

    return {
        "query": request.query,
        "count": len(clean_schemes),
        "schemes": clean_schemes
    }


# =========================================================
# AI-POWERED SCHEME EXPLANATION
# =========================================================

@app.post("/recommend-schemes-ai")
def recommend_schemes_ai(request: SchemeAIRequest):

    # Step 1: Retrieve relevant schemes
    schemes = recommend_schemes(
        query=request.query,
        top_k=request.top_k
    )

    # No matching schemes
    if not schemes:
        response = generate_response(
            message=(
                f"The user asked: {request.query}\n\n"
                "No matching scheme was found in FinSakhi's verified "
                "scheme knowledge base.\n\n"
                "Tell the user politely that no matching scheme was found "
                "and ask them for more details about their situation. "
                "Do not invent or suggest schemes that are not provided."
            ),
            language=request.language
        )

        return {
            "query": request.query,
            "language": request.language,
            "count": 0,
            "schemes": [],
            "response": response
        }

    # Step 2: Prepare verified scheme information for Gemini
    scheme_context = []

    for scheme in schemes:
        scheme_context.append({
            "name": scheme["name"],
            "short_name": scheme["short_name"],
            "government": scheme["government"],
            "category": scheme["category"],
            "target": scheme["target"],
            "purpose": scheme["purpose"],
            "benefit": scheme["benefit"],
            "important_note": scheme["important_note"],
            "source": scheme["source"]
        })

    # Step 3: Ask Gemini to explain ONLY the retrieved information
    ai_prompt = f"""
The user asked:

{request.query}

FinSakhi found these schemes in its verified knowledge base:

{scheme_context}

Explain the relevant schemes to the user in the requested language.

IMPORTANT:
- Use ONLY the scheme information provided above.
- Do not invent eligibility conditions.
- Do not invent benefits, subsidy amounts, loan amounts, interest rates,
  deadlines, documents or application procedures.
- Do not claim that the user is definitely eligible.
- Clearly say when eligibility depends on current scheme rules or
  local implementation.
- Keep the explanation simple and useful.
- Explain why each scheme may be relevant to the user's situation.
- Give a simple "What to do next" section, but only give safe general
  steps supported by the information provided.
- Give a "Documents to check" section only if documents are explicitly
  mentioned in the provided information. Otherwise say that the exact
  document requirements should be checked with the official scheme
  implementing authority.
- Keep official scheme names such as PMFME, PMMY and DAY-NRLM unchanged.
"""

    response = generate_response(
        message=ai_prompt,
        language=request.language
    )

    # Step 4: Return both structured data and AI explanation
    return {
        "query": request.query,
        "language": request.language,
        "count": len(scheme_context),
        "schemes": scheme_context,
        "response": response
    }