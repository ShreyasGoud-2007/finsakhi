import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
DATA_PATH = "data/finsakhi_transactions_v2.csv"

df = pd.read_csv(DATA_PATH)

X = df["description"]
y = df["category"]

# Split dataset into training and testing data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Create ML pipeline
model = Pipeline([
    (
        "tfidf",
        TfidfVectorizer(
            lowercase=True,
            stop_words="english"
        )
    ),
    (
        "classifier",
        LogisticRegression(
            max_iter=1000,
            class_weight="balanced"
)
    )
])

# Train the model
model.fit(X_train, y_train)

# Test the model
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\n========== MODEL RESULTS ==========")
print(f"Accuracy : {accuracy:.2%}")

print("\nClassification Report:\n")
print(classification_report(y_test, predictions))

# Create models folder if needed
Path("models").mkdir(exist_ok=True)

# Save trained model
model_path = "models/transaction_classifier.joblib"

joblib.dump(model, model_path)

print("\nModel saved successfully!")
print(f"Saved at {model_path}")