from recommendation import recommend_products


# --------------------------------------------------
# User preferences
# --------------------------------------------------

user_preferences = {
    "style": "Casual",
    "occasion": "College",
    "color": "Black",
    "season": "Summer",
    "size": "M",
    "budget": 3000
}


# --------------------------------------------------
# Generate recommendations
# --------------------------------------------------

recommendations = recommend_products(
    user_preferences,
    top_n=5
)


# --------------------------------------------------
# Display results
# --------------------------------------------------

print()
print("========================================")
print("          NEMO RECOMMENDATIONS")
print("========================================")
print()


if recommendations.empty:

    print(
        "No products found within the selected budget."
    )

else:

    for rank, (_, product) in enumerate(
        recommendations.iterrows(),
        start=1
    ):

        print(
            f"{rank}. {product['product_name']}"
        )

        print(
            f"   Category: {product['category']}"
        )

        print(
            f"   Style: {product['style']}"
        )

        print(
            f"   Occasion: {product['occasion']}"
        )

        print(
            f"   Color: {product['color']}"
        )

        print(
            f"   Season: {product['season']}"
        )

        print(
            f"   Size: {product['size']}"
        )

        print(
            f"   Price: ₹{product['price']}"
        )

        print(
            f"   Similarity Score: "
            f"{product['similarity_score']:.4f}"
        )

        print(
            f"   Image: {product['image_url']}"
        )

        print("----------------------------------------")