from datetime import datetime
from pydantic import BaseModel, ConfigDict


class PostCreate(BaseModel):
    user_id: int
    description: str


class PostResponse(BaseModel):
    id: int
    user_id: int
    description: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
