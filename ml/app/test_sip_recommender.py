from sip_recommender import recommend_sip_categories


print("\n========== SIP RECOMMENDER TEST ==========\n")


print("1. LOW RISK")

result = recommend_sip_categories(
    risk_level="low",
    goal="Emergency savings",
    years=3
)

print(result)


print("\n2. MODERATE RISK")

result = recommend_sip_categories(
    risk_level="moderate",
    goal="Child education",
    years=8
)

print(result)


print("\n3. HIGH RISK")

result = recommend_sip_categories(
    risk_level="high",
    goal="Long-term wealth building",
    years=15
)

print(result)


print("\n========== TEST COMPLETE ==========\n")