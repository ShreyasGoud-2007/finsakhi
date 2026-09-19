import pandas as pd

EXISTING_PATH = "data/finsakhi_transactions.csv"
AGRICULTURE_PATH = "data/agriculture_extra.csv"
OUTPUT_PATH = "data/finsakhi_transactions_v2.csv"

# Load existing training dataset
existing = pd.read_csv(EXISTING_PATH)

# Load additional agriculture examples
agriculture = pd.read_csv(AGRICULTURE_PATH)

# Combine datasets
combined = pd.concat(
    [existing, agriculture],
    ignore_index=True
)

# Remove exact duplicate rows
combined = combined.drop_duplicates()

# Shuffle the dataset
combined = combined.sample(
    frac=1,
    random_state=42
).reset_index(drop=True)

# Save new dataset
combined.to_csv(
    OUTPUT_PATH,
    index=False
)

print("Original rows:", len(existing))
print("New agriculture rows:", len(agriculture))
print("Combined rows:", len(combined))

print("\nCategory counts:")
print(combined["category"].value_counts())

print("\nSaved to:", OUTPUT_PATH)