
import os
import time
import requests
import pandas as pd

from pathlib import Path
from dotenv import load_dotenv


# --------------------------------------------------
# NEMO - UNSPLASH IMAGE FETCHER
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "dataset" / "products.csv"

load_dotenv(BASE_DIR / ".env")

ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")

API_URL = "https://api.unsplash.com/search/photos"


# --------------------------------------------------
# VALIDATE API KEY
# --------------------------------------------------

if not ACCESS_KEY:
    raise ValueError(
        "Unsplash API key not found. Check your .env file."
    )


# --------------------------------------------------
# GENERATE SEARCH QUERY
# --------------------------------------------------

def create_search_query(product):

    product_name = str(product["product_name"])
    category = str(product["category"])
    color = str(product["color"])

    return f"{color} {product_name} {category} fashion clothing"


# --------------------------------------------------
# FETCH IMAGE FROM UNSPLASH
# --------------------------------------------------

def fetch_image(query):

    headers = {
        "Authorization": f"Client-ID {ACCESS_KEY}"
    }

    params = {
        "query": query,
        "per_page": 1,
        "orientation": "squarish"
    }

    try:

        response = requests.get(
            API_URL,
            headers=headers,
            params=params,
            timeout=20
        )

        if response.status_code == 200:

            results = response.json().get("results", [])

            if results:
                photo = results[0]

                return {
                    "image_url": photo["urls"]["regular"],
                    "photographer": photo["user"]["name"],
                    "photographer_url": photo["user"]["links"]["html"],
                    "photo_url": photo["links"]["html"]
                }

            return None

        if response.status_code == 401:
            raise ValueError("Invalid Unsplash Access Key.")

        if response.status_code == 403:
            raise ValueError(
                "Unsplash access denied or API limit reached."
            )

        print("API error:", response.status_code)
        return None

    except requests.RequestException as error:

        print("Network error:", error)
        return None


# --------------------------------------------------
# UPDATE PRODUCT DATASET
# --------------------------------------------------

def update_product_images():

    if not DATASET_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found: {DATASET_PATH}"
        )

    df = pd.read_csv(DATASET_PATH)

    # Ensure image and attribution columns exist as text columns
    text_columns = [
        "image_url",
        "photographer",
        "photographer_url",
        "photo_url"
    ]

    for column in text_columns:

        if column not in df.columns:
            df[column] = ""

        df[column] = df[column].fillna("").astype(object)

    print("\n======================================")
    print("       NEMO IMAGE FETCHER")
    print("======================================")

    print("Total products:", len(df))

    updated = 0
    skipped = 0
    failed = 0

    for index, product in df.iterrows():

        existing_url = str(product["image_url"]).strip()

        if existing_url and existing_url.lower() != "nan":
            skipped += 1
            continue

        query = create_search_query(product)

        print(
            f"\n[{index + 1}/{len(df)}] Searching: {query}"
        )

        result = fetch_image(query)

        if result:

            df.at[index, "image_url"] = result["image_url"]
            df.at[index, "photographer"] = result["photographer"]
            df.at[index, "photographer_url"] = result["photographer_url"]
            df.at[index, "photo_url"] = result["photo_url"]

            updated += 1

            print("Image added successfully.")
            print("Photographer:", result["photographer"])

        else:

            failed += 1
            print("No image found.")

        # Save progress after every product
        df.to_csv(DATASET_PATH, index=False)

        # Respect API request limits
        time.sleep(0.5)

    print("\n======================================")
    print("       IMAGE UPDATE COMPLETED")
    print("======================================")

    print("Images added:", updated)
    print("Already available:", skipped)
    print("Failed searches:", failed)

    print("\nDataset saved successfully!")


# --------------------------------------------------
# RUN SCRIPT
# --------------------------------------------------

if __name__ == "__main__":
    update_product_images()
