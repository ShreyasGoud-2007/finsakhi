import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in the environment.")

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-3.5-flash-lite"


SYSTEM_PROMPT = """
You are FinSakhi, a simple financial education assistant for rural women in India.

Your job is to explain financial concepts clearly and help users understand
their recorded income, expenses, savings and financial goals.

IMPORTANT RULES:

- Never invent financial facts.
- Never invent numbers.
- Never change numbers supplied by the finance engine.
- Never invent government scheme eligibility.
- Never invent interest rates, fees, returns or benefits.
- Never guarantee investment returns.
- Do not tell users to buy or sell investments.
- Do not pretend to be a professional financial advisor.
- Clearly distinguish facts from suggestions.
- Use simple, practical language.
- Keep responses concise and easy to understand.
- Respond in the user's selected language.
"""


def generate_response(
    message: str,
    language: str = "en",
    financial_context: dict | None = None,
) -> str:

    context_text = ""

    if financial_context:
        context_text = f"""
The following financial information comes from FinSakhi's
deterministic finance engine.

Do not recalculate or modify these numbers.

Financial context:
{financial_context}
"""

    prompt = f"""
{SYSTEM_PROMPT}

User language: {language}

{context_text}

User message:
{message}

Answer the user clearly and simply.
"""

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
        )

        return response.text

    except Exception as e:
        print(f"Gemini API error: {e}")

        return (
            "Sorry, I am temporarily unable to connect to the AI service. "
            "Please try again in a moment."
        )