import joblib
from pathlib import Path


# Location of the trained model
MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "transaction_classifier.joblib"

# Confidence threshold
CONFIDENCE_THRESHOLD = 0.75


# Load the trained model once
model = joblib.load(MODEL_PATH)


def predict_category(description: str):
    """
    Predict the category of a transaction.

    Returns:
        category
        confidence
        status
    """

    # Clean the input
    description = description.strip()

    if not description:
        return {
            "category": "other",
            "confidence": 0.0,
            "status": "needs_confirmation"
        }

    # Predict category
    probabilities = model.predict_proba([description])[0]

    # Get category with highest probability
    best_index = probabilities.argmax()

    category = model.classes_[best_index]
    confidence = float(probabilities[best_index])

    # Decide whether prediction is confident enough
    if confidence >= CONFIDENCE_THRESHOLD:
        status = "accepted"
    else:
        status = "needs_confirmation"

    return {
        "category": category,
        "confidence": round(confidence, 4),
        "status": status
    }