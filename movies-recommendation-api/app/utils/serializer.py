def serialize_document(doc):
    """Helper function to convert ObjectId fields to string"""
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
    return doc