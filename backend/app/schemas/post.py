from datetime import datetime
from pydantic import BaseModel, ConfigDict


class PostCreate(BaseModel):
    description: str


class PostResponse(BaseModel):
    id: int
    user_id: int
    username: str | None = None
    description: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PostUpdate(BaseModel):
    description: str
