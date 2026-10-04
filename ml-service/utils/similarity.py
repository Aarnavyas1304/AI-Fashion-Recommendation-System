from sklearn.metrics.pairwise import cosine_similarity


def calculate_similarity(
    product_vectors,
    user_vector
):
    """
    Calculate cosine similarity between
    the user vector and product vectors.
    """

    scores = cosine_similarity(
        user_vector,
        product_vectors
    )

    return scores[0]