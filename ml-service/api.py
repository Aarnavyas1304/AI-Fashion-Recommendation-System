from typing import Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from recommendation import recommend_products


# --------------------------------------------------
# Create FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="NEMO Fashion Recommendation API",
    description="AI-powered fashion recommendation service",
    version="1.0.0"
)


# --------------------------------------------------
# Request Model
# --------------------------------------------------

class RecommendationRequest(BaseModel):

    style: str = Field(
        ...,
        example="Casual"
    )

    occasion: str = Field(
        ...,
        example="College"
    )

    color: str = Field(
        ...,
        example="Black"
    )

    season: str = Field(
        ...,
        example="Summer"
    )

    size: str = Field(
        ...,
        example="M"
    )

    budget: Optional[float] = Field(
        None,
        example=3000
    )


# --------------------------------------------------
# Root / Health Check
# --------------------------------------------------

@app.get("/")
def root():

    return {
        "message": "NEMO Fashion Recommendation API is running",
        "status": "success"
    }


# --------------------------------------------------
# Recommendation Endpoint
# --------------------------------------------------

@app.post("/recommend")
def get_recommendations(
    request: RecommendationRequest
):

    try:

        # Convert request into dictionary
        user_preferences = {
            "style": request.style,
            "occasion": request.occasion,
            "color": request.color,
            "season": request.season,
            "size": request.size,
            "budget": request.budget
        }

        # Generate recommendations
        recommendations = recommend_products(
            user_preferences,
            top_n=5
        )

        # No products found
        if recommendations.empty:

            return {
                "status": "success",
                "message": "No products found within the selected budget.",
                "recommendations": []
            }

        # Prepare API response
        results = []

        for _, product in recommendations.iterrows():

            results.append(
                {
                    "product_id": int(
                        product["product_id"]
                    ),

                    "product_name": product[
                        "product_name"
                    ],

                    "category": product[
                        "category"
                    ],

                    "style": product[
                        "style"
                    ],

                    "occasion": product[
                        "occasion"
                    ],

                    "color": product[
                        "color"
                    ],

                    "season": product[
                        "season"
                    ],

                    "size": product[
                        "size"
                    ],

                    "price": float(
                        product["price"]
                    ),

                    "similarity_score": round(
                        float(
                            product[
                                "similarity_score"
                            ]
                        ),
                        4
                    ),

                    "description": product[
                        "description"
                    ],

                    "image_url": (
                        None
                        if str(
                            product["image_url"]
                        ) == "nan"
                        else product["image_url"]
                    )
                }
            )

        return {
            "status": "success",
            "count": len(results),
            "recommendations": results
        }

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )