import pandas as pd
from sklearn.preprocessing import OneHotEncoder


# --------------------------------------------------
# Features used by NEMO for recommendation
# --------------------------------------------------

CATEGORICAL_COLUMNS = [
    "style",
    "occasion",
    "color",
    "season",
    "size"
]


# --------------------------------------------------
# Load Dataset
# --------------------------------------------------

def load_dataset(file_path):
    """
    Load the fashion product dataset from CSV.
    """

    return pd.read_csv(file_path)


# --------------------------------------------------
# Clean Dataset
# --------------------------------------------------

def clean_dataset(df):
    """
    Clean and validate the product dataset.
    """

    df = df.copy()

    required_columns = [
        "product_id",
        "product_name",
        "category",
        "style",
        "occasion",
        "color",
        "season",
        "size",
        "price"
    ]

    # Remove rows with missing important information
    df = df.dropna(
        subset=required_columns
    )

    # Convert price to numeric
    df["price"] = pd.to_numeric(
        df["price"],
        errors="coerce"
    )

    # Remove invalid prices
    df = df.dropna(
        subset=["price"]
    )

    return df


# --------------------------------------------------
# Create Encoder
# --------------------------------------------------

def create_encoder(df):
    """
    Create and fit One-Hot Encoder using
    the complete cleaned product dataset.
    """

    encoder = OneHotEncoder(
        handle_unknown="ignore",
        sparse_output=False
    )

    encoder.fit(
        df[CATEGORICAL_COLUMNS]
    )

    return encoder


# --------------------------------------------------
# Product Vectors
# --------------------------------------------------

def create_product_vectors(df, encoder):
    """
    Convert product features into numerical vectors.
    """

    product_vectors = encoder.transform(
        df[CATEGORICAL_COLUMNS]
    )

    return product_vectors


# --------------------------------------------------
# User Vector
# --------------------------------------------------

def create_user_vector(
    user_preferences,
    encoder
):
    """
    Convert user preferences into the same
    numerical feature space as products.
    """

    user_df = pd.DataFrame(
        [user_preferences]
    )

    user_vector = encoder.transform(
        user_df[CATEGORICAL_COLUMNS]
    )

    return user_vector