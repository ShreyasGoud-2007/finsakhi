from ml_model import predict_category


test_transactions = [
    "I bought rice and vegetables",
    "I paid my electricity bill",
    "I bought medicine from the pharmacy",
    "I paid 700"
]


for transaction in test_transactions:

    result = predict_category(transaction)

    print("\nTransaction:", transaction)
    print("Category:", result["category"])
    print("Confidence:", result["confidence"])
    print("Status:", result["status"])