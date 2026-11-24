
import numpy as np
from pathlib import Path

from utils.preprocessing import (
    load_dataset,
    clean_dataset,
    create_encoder,
    create_product_vectors,
    create_user_vector
)

from utils.similarity import calculate_similarity


# --------------------------------------------------
# Dataset Path (works from different directories)
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "dataset" / "products.csv"


# --------------------------------------------------
# Recommendation Function
# --------------------------------------------------

def recommend_products(user_preferences, top_n=5):

    """
    NEMO AI Fashion Recommendation System

    Features:
    - One-Hot Encoding
    - Multiple Color Preferences
    - Strict Style Matching
    - Strict Occasion Matching
    - Strict Color Matching
    - Cosine Similarity
    - Budget Filtering
    """

    # 1. Validate dataset

    if not DATASET_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found: {DATASET_PATH}"
        )

    # 2. Load and clean dataset

    df = load_dataset(str(DATASET_PATH))
    df = clean_dataset(df)

    if df.empty:
        raise ValueError("Dataset contains no valid products.")

    # Normalize categorical values

    categorical_columns = [
        "style", "occasion", "color", "season", "size"
    ]

    for column in categorical_columns:
        df[column] = df[column].astype(str).str.strip()

    # 3. Create encoder

    encoder = create_encoder(df)

    # 4. Validate required preferences

    required_fields = [
        "style", "occasion", "season", "size"
    ]

    for field in required_fields:
        value = user_preferences.get(field)

        if not isinstance(value, str) or not value.strip():
            raise ValueError(
                f"Missing or invalid preference: {field}"
            )

    # 5. Process multiple colors

    colors = user_preferences.get("colors")

    # Backward compatibility with single color

    if colors is None:
        old_color = user_preferences.get("color")
        colors = [old_color] if old_color else []

    elif isinstance(colors, str):
        colors = [colors]

    if not isinstance(colors, list):
        raise ValueError("Colors must be provided as a list.")

    colors = list(dict.fromkeys(
        color.strip()
        for color in colors
        if isinstance(color, str) and color.strip()
    ))

    if not colors:
        raise ValueError("Please select at least one color.")

    # 6. Create combined user preference vector

    user_vectors = []

    for color in colors:

        user_data = {
            "style": user_preferences["style"].strip(),
            "occasion": user_preferences["occasion"].strip(),
            "color": color,
            "season": user_preferences["season"].strip(),
            "size": user_preferences["size"].strip()
        }

        user_vector = create_user_vector(
            user_data,
            encoder
        )

        user_vectors.append(user_vector[0])

    user_vector = np.mean(
        user_vectors,
        axis=0
    ).reshape(1, -1)

    # 7. Apply budget filtering

    budget = user_preferences.get("budget")

    filtered_df = df.copy()

    if budget is not None:

        try:
            budget = float(budget)
        except (ValueError, TypeError):
            raise ValueError("Budget must be a valid number.")

        if budget < 0:
            raise ValueError("Budget cannot be negative.")

        filtered_df = filtered_df[
            filtered_df["price"] <= budget
        ].copy()

    # 8. Strict style filtering

    selected_style = user_preferences["style"].strip().casefold()

    filtered_df = filtered_df[
        filtered_df["style"].str.casefold() == selected_style
    ].copy()

    # 9. Strict occasion filtering

    selected_occasion = (
        user_preferences["occasion"].strip().casefold()
    )

    filtered_df = filtered_df[
        filtered_df["occasion"].str.casefold() == selected_occasion
    ].copy()

    # 10. Strict color filtering

    selected_colors = [
        color.casefold() for color in colors
    ]

    filtered_df = filtered_df[
        filtered_df["color"].str.casefold().isin(selected_colors)
    ].copy()

    # 11. Check matching products

    if filtered_df.empty:
        print(
            "No products found for these preferences. "
            "Try changing your style, occasion, colors or budget."
        )
        return filtered_df

    # 12. Create product vectors

    product_vectors = create_product_vectors(
        filtered_df,
        encoder
    )

    # 13. Calculate cosine similarity

    similarity_scores = calculate_similarity(
        product_vectors,
        user_vector
    )

    # 14. Add similarity scores

    filtered_df = filtered_df.copy()

    filtered_df["similarity_score"] = similarity_scores

    # 15. Sort by similarity

    filtered_df = filtered_df.sort_values(
        by="similarity_score",
        ascending=False
    )

    # 16. Return top recommendations

    return filtered_df.head(top_n).reset_index(drop=True)
