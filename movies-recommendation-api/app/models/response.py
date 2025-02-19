from pydantic import BaseModel
from typing import Any, List, Optional

# Common response model
class ResponseModel(BaseModel):
    status: str
    message: str
    data: Optional[Any] = None  # Data can be anything or None
