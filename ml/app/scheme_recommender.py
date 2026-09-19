import json
import os
import re


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMES_PATH = os.path.join(BASE_DIR, "knowledge", "schemes.json")


def load_schemes():
    with open(SCHEMES_PATH, "r", encoding="utf-8") as file:
        return json.load(file)


# ---------------------------------------------------------
# Multilingual keyword mapping
# Telugu + Hindi -> English concepts
# ---------------------------------------------------------

MULTILINGUAL_KEYWORDS = {

    # -------------------------
    # Telugu
    # -------------------------
    "మహిళ": ["woman", "women"],
    "మహిళలు": ["woman", "women"],
    "స్త్రీ": ["woman", "women"],
    "గ్రామీణ": ["rural"],
    "రైతు": ["farmer"],
    "రైతులు": ["farmer"],
    "వ్యవసాయం": ["agriculture", "farming"],
    "పంట": ["crop"],
    "పొలం": ["farm"],
    "నీటిపారుదల": ["irrigation"],
    "సౌర": ["solar"],
    "సౌర పంపు": ["solar pump"],
    "స్వయం సహాయక సంఘం": ["shg", "self help group"],
    "స్వయం సహాయక": ["shg"],
    "సంఘం": ["group"],
    "వ్యాపారం": ["business", "enterprise"],
    "చిన్న వ్యాపారం": ["small business", "business"],
    "ఆహారం": ["food"],
    "ఆహార": ["food"],
    "పచ్చడి": ["pickle"],
    "పచ్చళ్లు": ["pickle"],
    "అచారు": ["pickle"],
    "కుట్టు": ["tailoring", "tailor"],
    "కుట్టు పని": ["tailoring", "tailor"],
    "దర్జీ": ["tailor"],
    "ఇల్లు": ["house", "housing"],
    "ఇంటి": ["house", "housing"],
    "విద్యుత్": ["electricity"],
    "కరెంట్": ["electricity"],
    "బీమా": ["insurance"],
    "బ్యాంక్": ["bank account", "banking"],
    "రుణం": ["loan"],
    "లోన్": ["loan"],
    "నైపుణ్యం": ["skill", "training"],
    "శిక్షణ": ["training", "skill"],

    # -------------------------
    # Hindi
    # -------------------------
    "महिला": ["woman", "women"],
    "महिलाएं": ["woman", "women"],
    "औरत": ["woman", "women"],
    "ग्रामीण": ["rural"],
    "किसान": ["farmer"],
    "किसान": ["farmer"],
    "खेती": ["farming", "agriculture"],
    "कृषि": ["agriculture", "farming"],
    "फसल": ["crop"],
    "खेत": ["farm"],
    "सिंचाई": ["irrigation"],
    "सौर": ["solar"],
    "सोलर पंप": ["solar pump"],
    "स्वयं सहायता समूह": ["shg", "self help group"],
    "स्वयं सहायता": ["shg"],
    "समूह": ["group"],
    "व्यवसाय": ["business", "enterprise"],
    "छोटा व्यवसाय": ["small business", "business"],
    "खाना": ["food"],
    "खाद्य": ["food"],
    "अचार": ["pickle"],
    "पापड़": ["papad"],
    "सिलाई": ["tailoring", "tailor"],
    "दर्जी": ["tailor"],
    "घर": ["house", "housing"],
    "बिजली": ["electricity"],
    "करंट": ["electricity"],
    "बीमा": ["insurance"],
    "बैंक": ["bank account", "banking"],
    "बैंक खाता": ["bank account"],
    "ऋण": ["loan"],
    "लोन": ["loan"],
    "कौशल": ["skill", "training"],
    "प्रशिक्षण": ["training", "skill"]
}


def normalize_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\u0900-\u097F\u0C00-\u0C7F\s]", " ", text)
    return set(text.split())


def expand_query(query):
    """
    Converts important Telugu/Hindi words into
    English concepts used by our scheme database.
    """

    expanded_terms = set(normalize_text(query))

    query_lower = query.lower()

    for phrase, english_terms in MULTILINGUAL_KEYWORDS.items():
        if phrase.lower() in query_lower:
            expanded_terms.update(english_terms)

    return expanded_terms


def recommend_schemes(query: str, top_k: int = 5):
    schemes = load_schemes()

    query_lower = query.lower()
    query_terms = expand_query(query)

    results = []

    for scheme in schemes:
        score = 0

        keywords = scheme.get("keywords", [])

        # -------------------------------------------------
        # Keyword matching
        # -------------------------------------------------

        for keyword in keywords:
            keyword_lower = keyword.lower()

            if keyword_lower in query_lower:
                if len(keyword_lower.split()) > 1:
                    score += 4
                else:
                    score += 2

            elif keyword_lower in query_terms:
                if len(keyword_lower.split()) > 1:
                    score += 4
                else:
                    score += 2

        # -------------------------------------------------
        # Category-specific matching
        # -------------------------------------------------

        category = scheme.get("category", "").lower()

        # Farmer / agriculture
        if (
            "farmer" in query_terms
            or "farming" in query_terms
            or "agriculture" in query_terms
        ):
            if category in [
                "agriculture",
                "agriculture_credit",
                "agriculture_energy"
            ]:
                score += 5

        # Solar + irrigation
        if (
            "solar" in query_terms
            or "irrigation" in query_terms
            or "solar pump" in query_terms
        ):
            if category == "agriculture_energy":
                score += 6

        # Business
        if (
            "business" in query_terms
            or "enterprise" in query_terms
        ):
            if category in [
                "business",
                "food_business",
                "artisan",
                "youth_business"
            ]:
                score += 4

        # Tailoring
        if (
            "tailor" in query_terms
            or "tailoring" in query_terms
        ):
            if category == "artisan":
                score += 7

        # Food business
        if (
            "food" in query_terms
            or "pickle" in query_terms
            or "papad" in query_terms
        ):
            if category == "food_business":
                score += 7

        # SHG
        if (
            "shg" in query_terms
            or "self" in query_terms
            or "group" in query_terms
        ):
            if category in [
                "self_help_group",
                "women_shg",
                "food_business"
            ]:
                score += 6

        # Women
        if (
            "woman" in query_terms
            or "women" in query_terms
        ):
            if category in [
                "women_welfare",
                "women_shg",
                "self_help_group"
            ]:
                score += 3

        # Insurance
        if "insurance" in query_terms:
            if category == "insurance":
                score += 7

        # Banking
        if (
            "bank" in query_terms
            or "banking" in query_terms
            or "account" in query_terms
        ):
            if category == "financial_inclusion":
                score += 7

        # Housing
        if (
            "house" in query_terms
            or "housing" in query_terms
        ):
            if category == "housing":
                score += 7

        if score >= 4:
            results.append({
                "scheme": scheme,
                "score": score
            })

    results.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    return [
        item["scheme"]
        for item in results[:top_k]
    ]