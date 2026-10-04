from utils.preprocessing import (
    load_dataset,
    clean_dataset,
    create_encoder,
    create_product_vectors,
    create_user_vector
)

from utils.similarity import calculate_similarity


# --------------------------------------------------
# Dataset Path
# --------------------------------------------------

DATASET_PATH = "dataset/products.csv"


# --------------------------------------------------
# Recommendation Function
# --------------------------------------------------

def recommend_products(
    user_preferences,
    top_n=5
):
    """
    Generate fashion recommendations using:

    - One-Hot Encoding
    - Cosine Similarity
    - Budget Filtering

    User preferences:

        style
        occasion
        color
        season
        size
        budget

    Returns:
        Top N recommended products.
    """

    # --------------------------------------------------
    # 1. Load complete dataset
    # --------------------------------------------------

    df = load_dataset(
        DATASET_PATH
    )

    # --------------------------------------------------
    # 2. Clean complete dataset
    # --------------------------------------------------

    df = clean_dataset(
        df
    )

    # --------------------------------------------------
    # 3. Create encoder using COMPLETE dataset
    # --------------------------------------------------

    encoder = create_encoder(
        df
    )

    # --------------------------------------------------
    # 4. Create user preferences
    # --------------------------------------------------

    required_preferences = [
        "style",
        "occasion",
        "color",
        "season",
        "size"
    ]

    for field in required_preferences:

        if not user_preferences.get(field):

            raise ValueError(
                f"Missing required field: {field}"
            )

    user_data = {
        "style": user_preferences["style"],
        "occasion": user_preferences["occasion"],
        "color": user_preferences["color"],
        "season": user_preferences["season"],
        "size": user_preferences["size"]
    }

    # --------------------------------------------------
    # 5. Convert user preferences into vector
    # --------------------------------------------------

    user_vector = create_user_vector(
        user_data,
        encoder
    )

    # --------------------------------------------------
    # 6. Apply budget filter
    # --------------------------------------------------

    budget = user_preferences.get(
        "budget"
    )

    if budget is not None:

        try:

            budget = float(
                budget
            )

        except (ValueError, TypeError):

            raise ValueError(
                "Budget must be a valid number."
            )

        # Keep products within budget
        filtered_df = df[
            df["price"] <= budget
        ].copy()

    else:

        filtered_df = df.copy()

    # --------------------------------------------------
    # 7. Check if products are available
    # --------------------------------------------------

    if filtered_df.empty:

        return filtered_df

    # --------------------------------------------------
    # 8. Create vectors only for filtered products
    #    using the SAME encoder
    # --------------------------------------------------

    product_vectors = create_product_vectors(
        filtered_df,
        encoder
    )

    # --------------------------------------------------
    # 9. Calculate cosine similarity
    # --------------------------------------------------

    similarity_scores = calculate_similarity(
        product_vectors,
        user_vector
    )

    # --------------------------------------------------
    # 10. Add similarity scores
    # --------------------------------------------------

    filtered_df = filtered_df.copy()

    filtered_df[
        "similarity_score"
    ] = similarity_scores

    # --------------------------------------------------
    # 11. Sort by similarity
    # --------------------------------------------------

    filtered_df = filtered_df.sort_values(
        by="similarity_score",
        ascending=False
    )

    # --------------------------------------------------
    # 12. Return Top N
    # --------------------------------------------------

    return filtered_df.head(
        top_n
    )