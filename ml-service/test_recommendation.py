
from recommendation import recommend_products


# --------------------------------------------------
# NEMO USER PREFERENCES
# --------------------------------------------------

user_preferences = {
    "style": "Casual",
    "occasion": "College",
    "colors": [
        "Black",
        "White",
        "Blue",
        "Pink",
        "Red",
        "Green",
        "Purple",
        "Beige"
    ],
    "season": "Summer",
    "size": "M",
    "budget": 3000
}


# --------------------------------------------------
# GENERATE RECOMMENDATIONS
# --------------------------------------------------

if __name__ == "__main__":

    print("\n" + "=" * 45)
    print("          NEMO AI RECOMMENDATIONS")
    print("=" * 45)

    print("\nYOUR SELECTED PREFERENCES")
    print("-" * 45)
    print("Style:", user_preferences["style"])
    print("Occasion:", user_preferences["occasion"])
    print("Colors:", ", ".join(user_preferences["colors"]))
    print("Season:", user_preferences["season"])
    print("Size:", user_preferences["size"])
    print("Budget: ₹", user_preferences["budget"])

    try:

        recommendations = recommend_products(
            user_preferences,
            top_n=10
        )

        if recommendations.empty:

            print("\nNo matching products found.")
            print("Try changing your preferences or budget.")

        else:

            print("\n" + "=" * 45)
            print("          RECOMMENDED PRODUCTS")
            print("=" * 45)

            print(
                f"\nTotal recommendations: {len(recommendations)}"
            )

            for index, product in recommendations.iterrows():

                image_url = product.get("image_url")

                if image_url is None or str(image_url).lower() == "nan":
                    image_url = "Not available"

                print(f"\n{index + 1}. {product['product_name']}")
                print("-" * 45)

                print("Product ID:", product["product_id"])
                print("Category:", product["category"])
                print("Style:", product["style"])
                print("Occasion:", product["occasion"])
                print("Color:", product["color"])
                print("Season:", product["season"])
                print("Size:", product["size"])
                print("Price: ₹", product["price"])

                print(
                    "Similarity Score:",
                    f"{product['similarity_score']:.4f}"
                )

                print("Image:", image_url)

            print("\n" + "=" * 45)
            print("       RECOMMENDATIONS COMPLETED")
            print("=" * 45)

    except Exception as error:

        print("\nERROR GENERATING RECOMMENDATIONS")
        print("-" * 45)
        print(error)
